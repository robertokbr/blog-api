import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('blog.rbjr.dev Rest Api documentation.')
  .setVersion('1.0')
  .addBearerAuth()
  .setDescription(
    'This is the documentation of the API consumed by my personal blog. You can find the repository of the project heading to https://github.com/robertokbr/blog-api.',
  )
  .build();
