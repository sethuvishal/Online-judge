import { NotFoundError } from '../errors/not-found-error';
import db from '../services/prisma-client';
import { CreateProblem } from '../types/problem';

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

async function createProblem(data: CreateProblem) {
  const problem = await db.problem.create({
    data: {
      title: data.title,
      description: data.description,
      test_cases: data.test_cases,
      input_types: data.input_types,
      code_snippets: data.code_snippets,
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

async function updateProblem(
  data: { title?: string; description?: string },
  id: string
) {
  const existingProblem = await db.problem.findUnique({ where: { id } });
  if (!existingProblem) throw new NotFoundError('No Problem Found');
  const res = await db.problem.update({
    where: { id },
    data,
  });

  return res;
}

async function replaceTestCase(data: { test_cases: string }, id: string) {
  const existingProblem = await db.problem.findUnique({ where: { id } });
  if (!existingProblem) throw new NotFoundError('No Problem Found');
  const res = await db.problem.update({
    where: { id },
    data: {
      test_cases: data.test_cases,
    },
  });
  return res;
}

async function addTestCase(data: { test_cases: string }, id: string) {
  const existingProblem = await db.problem.findUnique({ where: { id } });
  if (!existingProblem) throw new NotFoundError('No Problem Found');

  const addedTestCases = JSON.parse(existingProblem.test_cases);

  const res = await db.problem.update({
    where: { id },
    data: {
      test_cases: addedTestCases,
    },
  });
  return res;
}

export default {
  getProblems,
  getProblem,
  createProblem,
  deleteProblem,
  updateProblem,
  replaceTestCase,
  addTestCase,
};
