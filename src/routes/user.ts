import express, { Request, Response } from 'express';
import { signup } from '../controllers/user';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';

export const router = express.Router();
// router.use('/users');

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
