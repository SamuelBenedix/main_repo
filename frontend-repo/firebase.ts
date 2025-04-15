import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import fbConfig from './lib/fbconfig.json';

const firebaseConfig = {
 apiKey: fbConfig.apiKey,
 authDomain: fbConfig.authDomain,
 projectId: fbConfig.projectId,
 storageBucket: fbConfig.storageBucket,
 messagingSenderId: fbConfig.messagingSenderId,
 appId: fbConfig.appId,
 measurementId: fbConfig.measurementId,
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
