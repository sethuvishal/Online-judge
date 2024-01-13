import { Router } from 'express';
import { router as userRouter } from './user.routes';
import { router as problemRouter } from './problem.routes';
import submissionRouter from './submission.routes';
import commentRouter from './comment.routes';
import voteRouter from './vote.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/problems', problemRouter);
router.use('/submission', submissionRouter);
router.use('/comment', commentRouter);
router.use('/vote', voteRouter);

export default router;
