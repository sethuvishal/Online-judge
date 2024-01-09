import { NextFunction, Request, Response } from 'express';
import SubmissionService from '../services/submission.service';

export async function getProblemSubmissions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const problemId = req.params.id;
    const submissions = await SubmissionService.getProblemSubmissions(
      req.user!.id,
      problemId
    );

    return res.status(200).json(submissions);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function getSubmission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const submission = await SubmissionService.getSubmission(req.params.id);

    return res.status(200).json(submission);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
