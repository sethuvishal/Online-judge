export type JwtPayload = {
  id: string;
  role: 'USER' | 'ADMIN';
  iat?: number;
  exp?: number;
};
