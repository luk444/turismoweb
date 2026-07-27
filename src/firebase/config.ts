import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  EmailAuthProvider,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

/*
 * ⚠️  CONFIGURACIÓN DE FIREBASE
 *
 * Reemplazá estos valores con los de tu proyecto Firebase.
 * Podés encontrarlos en: Firebase Console → Project Settings → Your apps
 *
 * Para obtener las variables de forma segura en producción, creá un archivo
 * `.env` en la raíz del proyecto con:
 *
 *   VITE_FIREBASE_API_KEY=...
 *   VITE_FIREBASE_AUTH_DOMAIN=...
 *   VITE_FIREBASE_PROJECT_ID=...
 *   VITE_FIREBASE_STORAGE_BUCKET=...
 *   VITE_FIREBASE_MESSAGING_SENDER_ID=...
 *   VITE_FIREBASE_APP_ID=...
 *   VITE_FIREBASE_MEASUREMENT_ID=...
 *
 * Las variables deben comenzar con VITE_ para que Vite las exponga al cliente.
 */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'DEMO_API_KEY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:000000000000:web:0000000000000000000000',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-XXXXXXXXXX',
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

// Proveedores de autenticación
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const emailProvider = new EmailAuthProvider();

// Configuración de MercadoPago
// La PUBLIC KEY es segura compartir en el cliente.
// La ACCESS TOKEN debe mantenerse en el servidor (Firebase Functions).
export const MP_PUBLIC_KEY =
  import.meta.env.VITE_MP_PUBLIC_KEY || 'TEST-PUBLIC-KEY';

export default app;
