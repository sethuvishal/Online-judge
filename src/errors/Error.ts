export abstract class ErrorService extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ErrorService.prototype);
  }

  abstract errorMessages(): { message: string; field?: string }[];
}
