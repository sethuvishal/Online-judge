import { ErrorService } from './Error';

export class NotAuthorizedError extends ErrorService {
  statusCode = 401;

  constructor() {
    super('Not Authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  errorMessages() {
    return [{ message: 'Not authorized' }];
  }
}
