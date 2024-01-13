import express from 'express';
import {
  deleteComment,
  getCommentsByProblem,
  postComment,
} from '../controllers/comment.controller';
import authMiddleware from '../middlewares/auth';
import { validateRequest } from '../middlewares/validate-request';
import { body } from 'express-validator';

const router = express.Router();

router.get('/problem/:id', getCommentsByProblem);
router.post(
  '/:id',
  [
    body('text')
      .isLength({ min: 1, max: 50 })
      .withMessage('Comment must be at least 1 to 50 characters long'),
  ],
  validateRequest,
  authMiddleware,
  postComment
);

router.delete('/:id', authMiddleware, deleteComment);

export default router;
