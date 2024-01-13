import { NotFoundError } from '../errors/not-found-error';
import db from './prisma-client';

async function getCommentsByProblem(problemId: string) {
  const comments = await db.comment.findMany({
    where: { problemId },
  });

  return comments;
}

async function postComment(
  problemId: string,
  authorId: string,
  { text }: { text: string }
) {
  const problem = await db.problem.findUnique({
    where: { id: problemId },
  });
  if (!problem) throw new NotFoundError('No Problem Found');

  const comments = await db.comment.create({
    data: { authorId, text, problemId },
  });

  return comments;
}

async function deleteComment(id: string, userId: string) {
  const comment = await db.comment.findUnique({ where: { id } });
  if (!comment) throw new NotFoundError('No Comment Found');
  if (comment.authorId !== userId)
    throw new NotFoundError("You'e not allowed for this action");

  const res = await db.comment.delete({ where: { id } });
  return res;
}

export default {
  getCommentsByProblem,
  postComment,
  deleteComment,
};
