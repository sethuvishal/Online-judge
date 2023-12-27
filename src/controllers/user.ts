import { NextFunction, Request, Response } from 'express';
import User from '../services/user';
import { createJwtToken } from '../utils/helper.util';

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { user, token } = await User.createUser(req.body);

    req.session = {
      JWT: token,
    };

    return res.status(200).json({ message: 'User Successfully Created', user });
  } catch (err) {
    next(err);
  }
}
