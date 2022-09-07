import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';

import { BadRequestExceptionFilter } from './exceptions/bad-request.filter';
import { mapErrorMessagesFromValidator } from './exceptions/exceptions.helpers';
import { HttpExceptionFilter } from './exceptions/http.filter';
import { QueryFailedExceptionFilter } from './exceptions/query-failed.filter';
import { ValidationFilter } from './exceptions/validation.filter';
import { ValidationException } from './exceptions/validation-exception.dto';
import { AppModule } from './modules/app/app.module';
import { TrimBodyPipe } from './utils/pipes/trim-body.pipe';

// eslint-disable-next-line
require("dotenv").config();

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });

  const config = new DocumentBuilder()
    .setTitle('Expooze API')
    .setDescription('Documentation')
    .setVersion('1.0')
    .build();

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new BadRequestExceptionFilter(),
    new QueryFailedExceptionFilter(),
    new ValidationFilter(),
  );

  app.useGlobalPipes(
    new TrimBodyPipe(),
    new ValidationPipe({
      whitelist: true,
      validationError: { target: false },
      exceptionFactory: (errors: ValidationError[]) => {
        return new ValidationException(
          errors.reduce(mapErrorMessagesFromValidator, {}),
        );
      },
    }),
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}

bootstrap();
