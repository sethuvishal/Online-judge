import { BadRequestError } from '../errors/bad-request-error';
import db from '../services/prisma-client';
import bcrypt from 'bcrypt';
import { createJwtToken } from '../utils/helper.util';

type User = {
  email: string;
  password: string;
  username: string;
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

export default {
  createUser,
};
