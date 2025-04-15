import * as admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';
import { Request, Response, NextFunction } from 'express';

if (!admin.apps.length) {
 admin.initializeApp({
  credential: admin.credential.cert({
   projectId: serviceAccount.project_id,
   clientEmail: serviceAccount.client_email,
   privateKey: serviceAccount.private_key?.replace(/\\n/g, '\n'),
  }),
 });
}

export const verifyIdToken = (token: string) => {
 return admin.auth().verifyIdToken(token);
};


interface DecodedIdToken {
 uid: string;
 [key: string]: unknown;
}

export async function verifyAuthToken(req: Request & { user?: DecodedIdToken }, res: Response, next: NextFunction): Promise<void> {
 const authHeader: string = req.headers.authorization || '';
 const token: string | undefined = authHeader.split('Bearer ')[1];

 if (!token) {
  res.status(401).json({ error: 'Missing token' });
  return;
 }

 try {
  const decoded: DecodedIdToken = await admin.auth().verifyIdToken(token);
  req.user = decoded;
  next();
 } catch (error) {
  console.error('Invalid token', error);
  res.status(401).json({ error: 'Unauthorized' });
  return
 }
}