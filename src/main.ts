import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { swaggerConfig } from './configs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      // whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
