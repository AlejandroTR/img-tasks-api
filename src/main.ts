import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV !== 'production') {
    setupSwagger(app);
  }

  await app.listen(3000);
}

const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Img Tasks Api')
    .setDescription('API documentation for processing images')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

void bootstrap();
