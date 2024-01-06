import { NotFoundError } from '../errors/not-found-error';
import db from '../services/prisma-client';

async function getProblems() {
  const problems = await db.problem.findMany();

  return problems;
}

async function getProblem(id: string) {
  const problem = await db.problem.findFirst({
    where: { id },
  });

  if (!problem) throw new NotFoundError('No Problem Found');

  return problem;
}

async function createProblem(data: any) {}

export default {
  getProblems,
  getProblem,
  createProblem,
};
