import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Social-dev API documentation')
  .setVersion('1.0')
  .addBearerAuth()
  .setDescription(
    'Social-dev Rest Api documentation used by the social-dev web Next app.',
  )
  .build();
