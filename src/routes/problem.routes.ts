import express from 'express';
import { getProblem, getProblems } from '../controllers/problem.contorller';

export const router = express.Router();

router.get('/', getProblems);
router.get('/:id', getProblem);
