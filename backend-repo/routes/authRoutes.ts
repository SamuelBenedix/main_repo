import express from 'express';
import { loginWithEmail, } from '../controller/authController';

const router = express.Router();

router.post('/sign-in', loginWithEmail);

export default router;
