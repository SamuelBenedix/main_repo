import { Request, Response } from 'express';
import { db } from '../config/firebaseConfig';

// GET /api/users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
 try {
  const snapshot = await db.collection('users').get();
  const users = snapshot.docs.map(doc => ({
   id: doc.id,
   ...doc.data(),
  }));
  res.status(200).json(users);
 } catch (error) {
  console.error('Error fetching users:', error);
  res.status(500).json({ error: (error as Error).message });
 }
};



// POST /api/users
export const createUser = async (req: Request, res: Response): Promise<void> => {
 try {
  const userData = req.body;
  const userRef = await db.collection('users').add(userData);

  res.status(201).json({
   message: 'User created successfully',
   userId: userRef.id,
  });
 } catch (error) {
  console.error('Error creating user:', error);
  res.status(500).json({ error: (error as Error).message });
 }
};

// GET /api/users/:id
export const getUserById = async (req: Request, res: Response): Promise<void> => {
 try {
  const { id } = req.params;
  const userDoc = await db.collection('users').doc(id).get();

  if (!userDoc.exists) {
   res.status(404).json({ message: 'User not found' });
   return;
  }

  res.status(200).json({
   id: userDoc.id,
   ...userDoc.data(),
  });
 } catch (error) {
  console.error('Error fetching user:', error);
  res.status(500).json({ error: (error as Error).message });
 }
};


// POST  api/users/:id 
export const updateUser = async (req: Request, res: Response): Promise<void> => {
 try {
  const uid = req.params.id;
  const data = req.body;

  const userDoc = await db.collection('users').doc(uid).set(data, { merge: true });

  res.status(200).json({
   message: 'User data updated successfully',
  });
 } catch (error) {
  console.error('Error updating user:', error);
  res.status(500).json({ error: (error as Error).message });
 }
};


// DELETE /api/users/:id 
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
 try {
  const uid = req.params.id;

  await db.collection('users').doc(uid).delete();

  res.status(200).json({
   message: 'User deleted successfully',
  });
 } catch (error) {
  console.error('Error deleting user:', error);
  res.status(500).json({ error: (error as Error).message });
 }
};