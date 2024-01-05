import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/jwtPayload';

export function createJwtToken(payload: JwtPayload, expiresIn = '30d') {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn });
  return token;
}
