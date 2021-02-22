import { ValidationError } from './validation-exception.dto';

export class FailedResponseDto {
  errorMessage: string;

  errors?: ValidationError;

  errorType?: string;
}
