import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

import { FailedResponseDto } from './failed-response.dto';
import { ValidationException } from './validation-exception.dto';

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const resp: FailedResponseDto = {
      errorMessage: exception.message,
      errors: exception.validationErrors,
    };

    response.status(status).json(resp);
  }
}
