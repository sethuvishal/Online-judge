import express from 'express';
import {
  createProblem,
  deleteProblem,
  getProblem,
  getProblems,
  updateProblem,
} from '../controllers/problem.contorller';
import { createProblemValidation } from '../middlewares/problemValidation';
import { validateRequest } from '../middlewares/validate-request';
import { body } from 'express-validator';

export const router = express.Router();

router.get('/', getProblems);
router.get('/:id', getProblem);
router.post('/', createProblemValidation, validateRequest, createProblem);
router.patch(
  '/:id',
  [
    body('title').isString().optional().isLength({ min: 5, max: 30 }),
    body('description').isString().optional().isLength({ min: 5, max: 200 }),
  ],
  validateRequest,
  updateProblem
);
router.delete('/:id', deleteProblem);
