import { NextFunction, Response, Request } from 'express';
import problemService from '../services/problem.service';
import { check, validationResult } from 'express-validator';

export async function getProblems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const problems = await problemService.getProblems();
    return res.status(200).json(problems);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function getProblem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const problem = await problemService.getProblem(req.params.id);

    return res.status(200).json(problem);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function createProblem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const problem = await problemService.createProblem(req.body);
    return res
      .status(201)
      .json({ message: 'Problem created successfully', problem });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function updateProblem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const problem = await problemService.updateProblem(req.body, req.params.id);
    return res
      .status(200)
      .json({ message: 'Problem updated successfully', problem });
  } catch (err) {
    console.log(err);
  }
}

export async function deleteProblem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await problemService.deleteProblem(req.params.id);
    return res
      .status(200)
      .json({ message: 'Problem deleted successfully', id: req.params.id });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
