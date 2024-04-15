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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bm55X2Zsb3dlcl80NEBleGFtcGxlLmNvbSIsInVzZXJJZCI6IjA1OTg3NmU0LTVhMTAtNGY0Zi1hNmRlLTg1ZGZlZjAzZDQ2YyIsImlhdCI6MTcxMzA4MzkzMSwiZXhwIjoxNzEzMTcwMzMxfQ._ozdiS_bR776MgR1XGmGqyh2rFZK-NN5yrKyTskk5aE

// 3678b43e-0485-4c36-a1d1-1276099629ac
