import { NextFunction, Request, Response } from 'express';
import User from '../services/user';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { JwtPayload } from '../types/jwtPayload';

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { user, token } = await User.createUser(req.body);
    res.cookie('Online_Judge', token, {
      maxAge: 10 * 100 * 60 * 60 * 24 * 30,
    });

    return res.status(200).json({ message: 'User Successfully Created', user });
  } catch (err) {
    next(err);
  }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    const token = await User.signIn(req.body);
    res.cookie('Online_Judge', token, { maxAge: 10 * 100 * 60 * 60 * 24 * 30 });
    return res.status(200).json({ message: 'User Successfully Signed In' });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new NotAuthorizedError('Login required');
    const user = await User.getUser(req.user.id);

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
