import express from 'express';
import authMiddleware from '../middlewares/auth';
import {
  createSubmission,
  getProblemSubmissions,
  getSubmission,
} from '../controllers/submission.controller';
import { validateRequest } from '../middlewares/validate-request';
import { body } from 'express-validator';

const router = express.Router();

router.get('/problem/:id', authMiddleware, getProblemSubmissions);
router.get('/:id', getSubmission);
router.post(
  '/',
  authMiddleware,
  [
    body('problemId').isUUID(),
    body('code').isString(),
    body('language').equals('JAVASCRIPT'),
  ],
  validateRequest,
  createSubmission
);

export default router;
