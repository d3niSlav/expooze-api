import { ValidationError } from 'class-validator';

import { ValidationError as CustomValidationError } from './validation-exception.dto';

export const mapErrorMessagesFromValidator = (
  messages: CustomValidationError,
  error: ValidationError,
): CustomValidationError => ({
  ...messages,
  [error.property]:
    error.constraints || !error.children || error.children.length === 0
      ? Object.values(error.constraints || [])
      : error.children.reduce(mapErrorMessagesFromValidator, {}),
});
