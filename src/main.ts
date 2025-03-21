import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenvFlow = require('dotenv-flow');

async function bootstrap() {
  dotenvFlow.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "http://localhost:3000", // Permite o frontend acessar o backend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true, // Permite envio de cookies e headers de autenticação
  });
  await app.listen(3050, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
