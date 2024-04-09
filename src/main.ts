import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // enable credentials (cookies, Authorization headers, etc.)
  });
  const config = new DocumentBuilder()
    .setTitle('BlogSphere')
    .setDescription('The Blogs API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWt Token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bm55X2RvZ184NEBnbWFpbC5jb20iLCJ1c2VySWQiOiIwOGNmZGQ2Yy1mYzVhLTQ5ZGUtOTFlYy05MGNiYjEzYTdhZjkiLCJpYXQiOjE3MTI2MTk1NjYsImV4cCI6MTcxMjcwNTk2Nn0.l-UDwOyE0-2gBToXyvkW_EtQSr0oK87Xsua4azEG1h8
