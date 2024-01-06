import express from 'express';
import { getMe, signIn, signup } from '../controllers/user.controller';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import authMiddleware from '../middlewares/auth';

export const router = express.Router();

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
    body('username')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Username must be between 4 and 20 characters'),
  ],
  validateRequest,
  signup
);

router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  signIn
);

router.get('/getMe', authMiddleware, getMe);
