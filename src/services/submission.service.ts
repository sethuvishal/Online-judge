import { NotFoundError } from '../errors/not-found-error';
import db from './prisma-client';

async function getProblemSubmissions(userId: string, problemId: string) {
  const submissions = await db.submission.findMany({
    where: { userId: userId, problemId: problemId },
  });

  return submissions;
}

async function getSubmission(id: string) {
  const submission = await db.submission.findUnique({
    where: { id },
  });

  if (!submission) throw new NotFoundError(`No submission found`);

  return submission;
}

export default {
  getProblemSubmissions,
  getSubmission,
};
