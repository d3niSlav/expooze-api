import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

import { FailedResponseDto } from './failed-response.dto';
import { PS_EXCEPTIONS } from '../utils/constants/postgres-constants';

interface QueryFailedFilter extends Error {
  code: string;
  message: string;
}

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedFilter, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const statusCode = 500;
    const errorType = PS_EXCEPTIONS[exception.code] || 'Internal Server Error';

    const resp: FailedResponseDto = {
      errorMessage: exception.message,
      errorType: errorType,
    };

    if (process.env.NODE_ENV !== 'production') {
      resp.errorMessage = exception.message;
    }

    response.status(statusCode).json(resp);
  }
}
