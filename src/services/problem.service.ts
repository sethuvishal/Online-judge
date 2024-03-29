import { NotFoundError } from '../errors/not-found-error';
import db from '../services/prisma-client';
import { CreateProblem, UpdateProblem } from '../types/problem';

async function getProblems() {
  const problems = await db.problem.findMany();

  return problems;
}

async function getProblem(id: string) {
  const problem = await db.problem.findFirst({
    where: { id },
    include: {
      codeSnippets: true,
      Comments: true,
      Vote: true,
    },
  });

  if (!problem) throw new NotFoundError('No Problem Found');

  return problem;
}

async function createProblem(data: CreateProblem) {
  const problem = await db.problem.create({
    data: {
      title: data.title,
      description: data.description,
      test_cases: data.test_cases,
      codeSnippets: {
        create: data.codeSnippets,
      },
    },
  });

  return problem;
}

async function deleteProblem(id: string) {
  const existingProblem = await db.problem.findUnique({
    where: { id },
  });

  if (!existingProblem) throw new NotFoundError('No Problem Found');

  await db.problem.delete({
    where: { id },
  });
}

async function updateProblem(data: UpdateProblem, id: string) {
  const existingProblem = await db.problem.findUnique({ where: { id } });
  if (!existingProblem) throw new NotFoundError('No Problem Found');
  const res = await db.problem.update({
    where: { id },
    data,
  });

  return res;
}

export default {
  getProblems,
  getProblem,
  createProblem,
  deleteProblem,
  updateProblem,
};
