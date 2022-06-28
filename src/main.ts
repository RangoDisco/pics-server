import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { graphqlUploadExpress } from 'graphql-upload';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(graphqlUploadExpress());
  app.enableCors({
    allowedHeaders: [
      'access-control-allow-credentials',
      'access-control-allow-headers',
      'access-control-allow-origin',
      'content-type',
    ],
    origin: [
      'http://localhost:3000',
      'https://dev.pics.maxime-dias.fr',
      'https://pics.maxime-dias.fr',
    ],
    credentials: true,
  });
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'uploads'));
  await app.listen(4000);
  console.log('Server ready');
}
bootstrap();
