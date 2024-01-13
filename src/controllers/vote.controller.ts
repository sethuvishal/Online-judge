import { NextFunction, Request, Response } from 'express';
import voteService from '../services/vote.service';

export async function updateVote(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const updated = await voteService.updateVote(
      req.user!.id,
      req.params.id,
      req.body.voteType
    );
    return res.status(200).json({ message: 'Updated Successfully' });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
