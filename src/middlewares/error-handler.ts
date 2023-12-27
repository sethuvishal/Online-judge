import { Request, Response, NextFunction } from 'express';
import { ErrorService } from '../errors/Error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorService) {
    console.log(err);
    return res.status(err.statusCode).send({ errors: err.errorMessages() });
  }
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
