import 'dotenv/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { validationPripeConfig } from './configs/validation-pipe.config';
import { swaggerConfig } from './configs/swagger.config';
import { apiConfig } from './configs/api.config';
import { Logger as PinoLogger } from 'nestjs-pino';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { AllExceptionFilter } from './shared/filters/exceptions-logger.filter';
import { LoggingInterceptor } from './shared/interceptors/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app: app as any }),
      ],

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });

    app.use(Sentry.Handlers.requestHandler());
    // TracingHandler creates a trace for every incoming request
    app.use(Sentry.Handlers.tracingHandler());
  }

  app.enableCors();
  app.useLogger(app.get(PinoLogger));
  app.useGlobalPipes(new ValidationPipe(validationPripeConfig));
  app.useGlobalInterceptors(new LoggingInterceptor(app.get(PinoLogger)));
  app.useGlobalFilters(
    new AllExceptionFilter(app.get(PinoLogger), app.get(HttpAdapterHost)),
  );

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  await app.listen(apiConfig.port);
}

bootstrap();
