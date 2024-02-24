import { isAdmin } from '../middlewares/auth';
import express from 'express';
import { addToProblem } from '../controllers/codeSnippet.controller';
import { validateRequest } from '../middlewares/validate-request';
import { body } from 'express-validator';
import { Language } from '@prisma/client';

export const router = express.Router();

router.post(
  '/',
  [
    body('lang').custom((lang) => {
      return lang === Language;
    }),
    body('code').isString(),
    body('problemId').isUUID(),
  ],
  validateRequest,
  isAdmin,
  addToProblem
);
