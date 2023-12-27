import { ErrorService } from './Error';

export class DatabaseConnectionError extends ErrorService {
  statusCode = 500;
  reason = 'Error connecting to database';

  constructor() {
    super('Error connecting to db');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  errorMessages() {
    return [{ message: this.reason }];
  }
}
