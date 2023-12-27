import { ValidationError } from 'express-validator';
import { ErrorService } from './Error';

export class RequestValidationError extends ErrorService {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  errorMessages() {
    return this.errors.map((err) => {
      if (err.type === 'field') {
        return { message: err.msg, field: err.path };
      }
      return { message: err.msg };
    });
  }
}
