import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import db from '../services/prisma-client';

export async function getAllUsers(req: Request, res: Response) {
  const users = await db.user.findMany();
  res.json(users);
}
