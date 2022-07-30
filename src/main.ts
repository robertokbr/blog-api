import 'dotenv/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { validationPripeConfig } from './infrastructure/configs/validation-pipe.config';
import { swaggerConfig } from './infrastructure/configs/swagger.config';
import { apiConfig } from './infrastructure/configs/api.config';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logger.interceptor';
import { Logger as PinoLogger } from 'nestjs-pino';
import { AllExceptionFilter } from './infrastructure/common/filters/exceptions-logger.filter';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  Sentry.init({
    dsn: "https://ba1e80f87e8e40aea5d821028b6d0f0d@o1340494.ingest.sentry.io/6613294",
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
