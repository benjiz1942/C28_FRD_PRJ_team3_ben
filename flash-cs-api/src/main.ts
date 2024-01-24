import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      process.env.FRONTEND_ORIGIN ?? 'http://localhost:3000',
      'https://frdproject.lhydm.me',
    ],
  });
  await app.listen(8080);
}
bootstrap();
