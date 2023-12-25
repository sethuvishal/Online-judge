import { Router } from 'express';
import { router as userRouter } from './user';

const router = Router();

router.use('/users', userRouter);

export default router;
