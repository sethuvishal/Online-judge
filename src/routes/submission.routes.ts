import express from 'express';
import authMiddleware from '../middlewares/auth';
import {
  getProblemSubmissions,
  getSubmission,
} from '../controllers/submission.controller';

const router = express.Router();

router.get('/problem/:id', authMiddleware, getProblemSubmissions);
router.get('/:id', getSubmission);

export default router;
