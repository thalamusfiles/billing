import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NotFoundExceptionFilter } from './commons/catch.exception';
import * as session from 'express-session';
import cookieConfig from './config/cookie.config';
import billingConfig from './config/billing.config';
import { AppModule } from './app/app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger
  const config = new DocumentBuilder().setTitle('Thalamus Register Swagger').setDescription('All endpoints are available on swagger ').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // Filtro de exceção do ORM
  app.useGlobalFilters(new NotFoundExceptionFilter());

  app.use(cookieParser());

  // Sessão
  app.use(
    session({
      secret: cookieConfig.SECRET,
      name: cookieConfig.NAME,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: cookieConfig.HTTP_ONLY,
        sameSite: cookieConfig.SAME_SITE as false | undefined,
        maxAge: cookieConfig.MAX_AGE,
        path: cookieConfig.PATH,
      },
    }),
  );

  // Cors
  if (!billingConfig.PRODCTION_MODE) {
    app.enableCors({
      origin: billingConfig.DEV_URL,
      credentials: true,
    });
  }

  await app.listen(billingConfig.PORT);
}
bootstrap();
