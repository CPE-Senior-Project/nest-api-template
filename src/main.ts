import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1/');
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  if (process.env.MODE === 'development') {
    const configSwagger = new DocumentBuilder()
      .setTitle('Project Name APIs')
      .setDescription('Project Name APIs documents')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('/api/v1/swagger', app, document);
  }

  const port = configService.get<number>('port') || 8000;
  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
  await app.listen(port);
}
bootstrap();
