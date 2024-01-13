import express from 'express';
import authMiddleware from '../middlewares/auth';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { updateVote } from '../controllers/vote.controller';

const router = express.Router();

router.patch(
  '/problem/:id',
  authMiddleware,
  [
    body('voteType')
      .custom((voteType) => voteType === 'UP' || voteType === 'DOWN')
      .withMessage('vote type must UP or DOWN'),
  ],
  validateRequest,
  updateVote
);

export default router;
