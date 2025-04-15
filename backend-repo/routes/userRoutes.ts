import express from 'express';
import { authMiddleware } from '../middleware/authMiddleWare';
import { createUser, getUserById, getUsers, updateUser, } from '../controller/userController';
import { deleteUser } from 'firebase/auth';

const router = express.Router();

// GET all users
router.get('/users', authMiddleware, getUsers);

// GET one user by ID
router.get('/users/:id', authMiddleware, getUserById);

// POST create a new user
router.post('/users', authMiddleware, createUser);

// PUT update user by ID
router.put('/users/:id', authMiddleware, updateUser);

// DELETE delete user by ID
router.delete('/users/:id', authMiddleware, deleteUser);


export default router;
