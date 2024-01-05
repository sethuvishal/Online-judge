import { ErrorService } from './Error';

export class NotAuthorizedError extends ErrorService {
  statusCode = 401;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  errorMessages() {
    return [{ message: this.message }];
  }
}
