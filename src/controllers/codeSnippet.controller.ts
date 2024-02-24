import { NextFunction, Response, Request } from 'express';
import codeSnippetService from '../services/codeSnippet.service';

export async function addToProblem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const codeSnippet = await codeSnippetService.createSnippet(req.body);

    return codeSnippet;
  } catch (err) {
    console.log(err);
    next(err);
  }
}
