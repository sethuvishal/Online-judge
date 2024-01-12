import JavaScriptRunner from '../Judge/JavaScriptRunner';
import { NotFoundError } from '../errors/not-found-error';
import { createSubmissionType } from '../types/solution';
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

async function createSubmission(userId: string, data: createSubmissionType) {
  const problem = await db.problem.findUnique({
    where: { id: data.problemId },
  });
  if (!problem) throw new NotFoundError(`No Problem Found`);

  const submissionData = { ...data, userId };

  const submission = await db.submission.create({
    data: submissionData,
  });
  const runner = new JavaScriptRunner();
  runner.run(problem, submission.code).then(async (data) => {
    console.log(data);
    await db.submission.update({
      where: { id: submission.id },
      data: {
        timeTaken: data.timeTaken || null,
        result: data.status,
        memoryUsed: data.memoryUsed,
        failedTestCase: JSON.stringify(data.test_case),
      },
    });
  });

  return submission;
}

export default {
  getProblemSubmissions,
  getSubmission,
  createSubmission,
};
