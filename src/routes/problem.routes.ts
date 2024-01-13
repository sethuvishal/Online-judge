import express from 'express';
import {
  createProblem,
  deleteProblem,
  getProblem,
  getProblems,
  updateProblem,
} from '../controllers/problem.controller';
import { createProblemValidation } from '../middlewares/problemValidation';
import { validateRequest } from '../middlewares/validate-request';
import { body } from 'express-validator';
import { isAdmin } from '../middlewares/auth';

export const router = express.Router();

router.get('/', getProblems);
router.get('/:id', getProblem);
router.use(isAdmin);
router.post('/', createProblemValidation, validateRequest, createProblem);
router.put('/:id', createProblemValidation, validateRequest, updateProblem);

router.delete('/:id', deleteProblem);
