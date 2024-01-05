import { NextFunction, Request, Response } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import jwt from 'jsonwebtoken';
import UserService from '../services/user';
import { JwtPayload } from '../types/jwtPayload';

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.Online_Judge;
    if (!token) throw new NotAuthorizedError('Forbidden resource');

    const payload: JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;
    console.log(payload);
    if (!payload) throw new NotAuthorizedError('Login required');
    const currentTime = Math.floor(Date.now() / 1000);
    console.log(currentTime);
    if (payload.exp && currentTime > payload.exp)
      throw new NotAuthorizedError('Login Expired');
    const user = await UserService.getUser(payload.id!);
    if (!user) throw new NotAuthorizedError('Forbidden resource');
    if (!user.tokens.some((t) => t === token))
      throw new NotAuthorizedError('Forbidden resource');
    req.user = payload;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}
