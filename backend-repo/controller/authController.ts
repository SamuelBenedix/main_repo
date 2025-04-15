import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Request, Response } from 'express';
import { initializeApp, getApps } from 'firebase/app';
import fbConfig from '../config/fbConfig.json';

if (!getApps().length) {
 initializeApp(fbConfig);
}

export const loginWithEmail = async (
 req: Request,
 res: Response
): Promise<void> => {
 const { email, password } = req.body;

 if (!email || !password) {
  res.status(400).json({ error: 'Email and password are required' });
 }

 try {
  const auth = getAuth();
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  const idToken = await userCredential.user.getIdToken();

  const response = await fetch('http://localhost:3000/api/users', {
   method: 'GET',
   headers: {
    'Authorization': `Bearer ${idToken}`,
   },
  });

  let userData = null;
  const text = await response.text();

  if (text) {
   try {
    userData = JSON.parse(text);
   } catch (parseErr) {
    console.error('Failed to parse JSON:', parseErr);
   }
  } else {
   console.warn('Empty response from /api/users');
  }

  res.status(200).json({ idToken, user: userData });

 } catch (error) {
  if (error instanceof Error) {
   console.error('Error logging in:', error.message);
   res.status(401).json({ error: error.message });
  } else {
   res.status(500).json({ error: 'An unexpected error occurred' });
  }
 }
};
