import db from '../services/prisma-client';
import { NotFoundError } from '../errors/not-found-error';
import { createCodeSnippet } from '../types/codeSnippet';

async function createSnippet(codeSnippet: createCodeSnippet) {
  const problem = await db.problem.findUnique({
    where: { id: codeSnippet.problemId },
  });
  if (!problem) throw new NotFoundError('No problem found');

  const snippet = await db.codeSnippet.findFirst({
    where: {
      problemId: codeSnippet.problemId,
      lang: codeSnippet.lang,
    },
  });
  if (!snippet) {
    return await db.codeSnippet.create({
      data: {
        lang: codeSnippet.lang,
        code: codeSnippet.code,
        problemId: codeSnippet.problemId,
      },
    });
  } else {
    return await db.codeSnippet.update({
      where: {
        id: snippet.id,
      },
      data: {
        code: codeSnippet.code,
      },
    });
  }
}

export default {
  createSnippet,
};
