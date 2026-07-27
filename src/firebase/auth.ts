import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
  type User,
  type UserCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider, githubProvider } from './config';
import type { AppUser } from '../types';

/** Registro con email y password */
export async function registerWithEmail(
  email: string,
  password: string,
  displayName: string,
): Promise<UserCredential> {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  // Actualizar el displayName del usuario
  await updateProfile(cred.user, { displayName });
  // Crear documento de usuario en Firestore
  await createUserProfile(cred.user, displayName);
  return cred;
}

/** Login con email y password */
export async function loginWithEmail(
  email: string,
  password: string,
): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email, password);
}

/** Login con Google */
export async function loginWithGoogle(): Promise<UserCredential> {
  const cred = await signInWithPopup(auth, googleProvider);
  // Asegurar que el perfil exista en Firestore
  await createUserProfile(cred.user);
  return cred;
}

/** Login con GitHub */
export async function loginWithGithub(): Promise<UserCredential> {
  const cred = await signInWithPopup(auth, githubProvider);
  await createUserProfile(cred.user);
  return cred;
}

/** Logout */
export async function logout(): Promise<void> {
  await signOut(auth);
}

/** Escuchar cambios en la sesión */
export function onAuthChange(
  callback: (user: User | null) => void,
) {
  return onAuthStateChanged(auth, callback);
}

/** Crear o actualizar el perfil del usuario en Firestore */
async function createUserProfile(
  user: User,
  displayName?: string,
): Promise<void> {
  const userRef = doc(db, 'users', user.uid);
  const existing = await getDoc(userRef);

  if (!existing.exists()) {
    const profile: Omit<AppUser, 'uid'> = {
      email: user.email,
      displayName: displayName ?? user.displayName ?? null,
      photoURL: user.photoURL ?? null,
      isAdmin: false,
      createdAt: Date.now(),
    };
    await setDoc(userRef, profile, { merge: true });
  }
}

/** Obtener el perfil de un usuario */
export async function getUserProfile(uid: string): Promise<AppUser | null> {
  const userRef = doc(db, 'users', uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) return null;
  return { uid, ...(snap.data() as Omit<AppUser, 'uid'>) };
}

export { auth };
