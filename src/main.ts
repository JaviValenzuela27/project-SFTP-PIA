import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import {
  SERVER_CORS_CONNECTION,
  SERVER_CORS_CONNECTIONDNS,
  APP_PORT,
} from './config';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  // Configuracion CORS para configuracion con frontend
  const corsOption = {
    origin: [SERVER_CORS_CONNECTION, SERVER_CORS_CONNECTIONDNS],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  app.use(cors(corsOption));
  //Configuracion para documentacion en Swagger
  const config = new DocumentBuilder()
    .setTitle("File's Management PIA")
    .setDescription('A system to keep files under control.')
    .setVersion('1.0')
    .addTag('Files')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(APP_PORT);
}
bootstrap();
