import { NotAuthorizedError } from '../errors/not-authorized-error';
import { JwtPayload } from '../types/jwtPayload';
import UserService from '../services/user';
import jwt from 'jsonwebtoken';

export function verifyJwt(token: string, secret: string) {
  const payload: JwtPayload = jwt.verify(token, secret) as JwtPayload;
  if (!payload) throw new NotAuthorizedError('Login required');
  return payload;
}

export function isTokenExpired(payload: JwtPayload) {
  const currentTime = Math.floor(Date.now() / 1000);
  if (payload.exp && currentTime > payload.exp)
    throw new NotAuthorizedError('Login Expired');
}

export async function validUser(payload: JwtPayload, token: string) {
  const user = await UserService.getUser(payload.id!);
  if (!user) throw new NotAuthorizedError('Forbidden resource');
  if (!user.tokens.some((t) => t === token))
    throw new NotAuthorizedError('Forbidden resource');
}
