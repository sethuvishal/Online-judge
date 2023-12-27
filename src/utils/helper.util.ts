import jwt from 'jsonwebtoken';

type UserPayload = {
  id: string;
  role: string;
};
export function createJwtToken(payload: UserPayload, expiresIn = '30d') {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn });
  return token;
}
