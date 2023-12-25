import express, { Request, Response } from 'express';
import { getAllUsers } from '../controllers/user';

export const router = express.Router();
// router.use('/users');

router.get('/', getAllUsers);
