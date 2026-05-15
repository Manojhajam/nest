import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

app.useGlobalPipes(new ValidationPipe({
  whitelist: true,             // Strip properties that do not have any decorators
  forbidNonWhitelisted: true,  // Throw an error if non-whitelisted properties are present
}));

  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads',
  });

 app.enableCors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://news-by-manoj.netlify.app/',
      'https://news-by-manoj.netlify.app/*',
    ];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
});

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
