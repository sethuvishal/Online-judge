import { BadRequestError } from '../errors/bad-request-error';
import db from '../services/prisma-client';
import bcrypt from 'bcrypt';
import { createJwtToken } from '../utils/helper.util';
import { NotFoundError } from '../errors/not-found-error';

type User = {
  email: string;
  password: string;
  username: string;
};

type LoginDto = {
  email: string;
  password: string;
};

async function createUser(userData: User) {
  const { email, password, username } = userData;

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser)
    throw new BadRequestError(`User ${existingUser.email} already exists`);

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      email,
      password: passwordHash,
      Username: username,
    },
  });

  const payload = { id: user.id, role: user.role };
  const token = createJwtToken(payload);
  user.tokens.push(token);

  await db.user.update({
    data: { tokens: user.tokens },
    where: {
      id: user.id,
    },
  });
  return { user, token };
}

async function signIn(data: LoginDto): Promise<string> {
  const user = await db.user.findUnique({ where: { email: data.email } });

  if (!user) throw new NotFoundError('User Not Found');

  const passwordCompare = await bcrypt.compare(data.password, user.password);
  if (!passwordCompare) throw new NotFoundError('User Not Found');

  const payload = { id: user.id, role: user.role };
  const token = createJwtToken(payload);
  user.tokens.push(token);

  await db.user.update({
    data: { tokens: user.tokens },
    where: {
      id: user.id,
    },
  });

  return token;
}
async function getUser(id: string) {
  const user = await db.user.findUnique({ where: { id } });
  if (!user) throw new NotFoundError('User Not Found');
  return user;
}
export default {
  createUser,
  signIn,
  getUser,
};
