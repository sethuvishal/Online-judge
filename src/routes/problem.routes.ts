import express from 'express';
import {
  addTestCase,
  createProblem,
  deleteProblem,
  getProblem,
  getProblems,
  replaceTestCase,
  updateProblem,
} from '../controllers/problem.controller';
import {
  createProblemValidation,
  testCaseValidation,
} from '../middlewares/problemValidation';
import { validateRequest } from '../middlewares/validate-request';
import { body } from 'express-validator';
import { isAdmin } from '../middlewares/auth';

export const router = express.Router();

router.get('/', getProblems);
router.get('/:id', getProblem);
router.use(isAdmin);
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
router.patch(
  '/replaceTestCases/:id',
  testCaseValidation,
  validateRequest,
  replaceTestCase
);
router.patch(
  '/addTestCases/:id',
  testCaseValidation,
  validateRequest,
  addTestCase
);
router.delete('/:id', deleteProblem);
