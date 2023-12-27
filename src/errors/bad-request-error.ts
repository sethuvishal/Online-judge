import { ErrorService } from './Error';

export class BadRequestError extends ErrorService {
  statusCode = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  errorMessages() {
    return [{ message: this.message }];
  }
}
