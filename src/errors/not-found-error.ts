import { ErrorService } from './Error';

export class NotFoundError extends ErrorService {
  statusCode = 404;

  constructor(public message: string) {
    super('Route not found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  errorMessages() {
    return [{ message: this.message }];
  }
}
