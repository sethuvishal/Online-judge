import { NextFunction, Request, Response } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { isTokenExpired, validUser, verifyJwt } from '../utils/auth.utils';

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.Online_Judge;
    if (!token) throw new NotAuthorizedError('Forbidden resource');
    const payload = verifyJwt(token, process.env.JWT_SECRET!);
    isTokenExpired(payload);
    validUser(payload, token);
    req.user = payload;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.Online_Judge;
    if (!token) throw new NotAuthorizedError('Forbidden resource');
    const payload = verifyJwt(token, process.env.JWT_SECRET!);
    isTokenExpired(payload);
    if (payload.role !== 'ADMIN')
      throw new NotAuthorizedError("Authorized person's only");
    await validUser(payload, token);
    req.user = payload;
    next();
  } catch (err) {
    // console.log(err);
    next(err);
  }
}
