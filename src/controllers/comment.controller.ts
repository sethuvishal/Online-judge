import { NextFunction, Request, Response } from 'express';
import commentService from '../services/comment.service';

export async function getCommentsByProblem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const comments = await commentService.getCommentsByProblem(req.params.id);

    return res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function postComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const comment = await commentService.postComment(
      req.params.id,
      req.user!.id,
      { text: req.body.text }
    );

    return res.status(201).json(comment);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function deleteComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const comment = await commentService.deleteComment(
      req.params.id,
      req.user!.id
    );

    return res.status(200).json({ message: 'Delete successfully' });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
