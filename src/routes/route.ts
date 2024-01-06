import { Router } from 'express';
import { router as userRouter } from './user.routes';
import { router as problemRouter } from './problem.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/problems', problemRouter);

export default router;
