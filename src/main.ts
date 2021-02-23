import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
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
require('dotenv').config();

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });

  app.enableCors();

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

  await app.listen(port);
}

bootstrap();
