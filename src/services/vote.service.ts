import { $Enums } from '@prisma/client';
import db from './prisma-client';
import { NotFoundError } from '../errors/not-found-error';

async function updateVote(
  userId: string,
  problemId: string,
  voteType: $Enums.VoteType
) {
  const problem = await db.problem.findUnique({ where: { id: problemId } });

  if (!problem) throw new NotFoundError('No Problem Found');

  const vote = await db.vote.findUnique({
    where: {
      userId_problemId: { userId, problemId },
    },
  });
  if (!vote) {
    return await db.vote.create({
      data: { userId, problemId, type: voteType },
    });
  }
  if (vote) {
    if (vote.type === voteType) {
      // If the user already voted and now trying to delete the vote
      return await db.vote.delete({
        where: { userId_problemId: { userId, problemId } },
      });
    } else {
      // If the user already voted, then update to different type
      return await db.vote.update({
        where: {
          userId_problemId: { userId, problemId },
        },
        data: {
          type: voteType,
        },
      });
    }
  }
  return vote;
}

export default {
  updateVote,
};
