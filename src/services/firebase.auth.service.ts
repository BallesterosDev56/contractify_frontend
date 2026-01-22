/**
 * Servicio de autenticación con Firebase
 *
 * @description Maneja todas las operaciones de autenticación con Firebase:
 * - Login con email y contraseña
 * - Login con Google (popup)
 * - Registro de nuevos usuarios
 * - Recuperación de contraseña
 * - Gestión de tokens y estado de autenticación
 */

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  type User as FirebaseUser,
  type UserCredential,
} from 'firebase/auth';
import { firebaseAuth } from '@/auth/firebase';
import type { LoginRequest, RegisterRequest, User as AppUser } from '@/types';

/**
 * Mapea códigos de error de Firebase a mensajes en español
 */
const getFirebaseErrorMessage = (errorCode: string): string => {
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'Este email ya está registrado',
    'auth/invalid-email': 'El email no es válido',
    'auth/weak-password': 'La contraseña es muy débil. Debe tener al menos 6 caracteres',
    'auth/user-not-found': 'No existe una cuenta con este email',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
    'auth/operation-not-allowed': 'Esta operación no está permitida',
    'auth/too-many-requests': 'Demasiados intentos. Por favor intenta más tarde',
    'auth/network-request-failed': 'Error de conexión. Verifica tu internet',
    'auth/requires-recent-login': 'Esta operación requiere que inicies sesión nuevamente',
    'auth/invalid-action-code': 'El código de verificación no es válido o ha expirado',
    'auth/expired-action-code': 'El código de verificación ha expirado',
    'auth/user-token-expired': 'Tu sesión ha expirado. Por favor inicia sesión nuevamente',
    'auth/popup-closed-by-user': 'La ventana de inicio de sesión fue cerrada',
    'auth/popup-blocked': 'La ventana emergente fue bloqueada. Por favor permite ventanas emergentes',
    'auth/cancelled-popup-request': 'Solo se puede abrir una ventana de inicio de sesión a la vez',
    'auth/account-exists-with-different-credential': 'Ya existe una cuenta con este email usando otro método de inicio de sesión',
  };

  return errorMessages[errorCode] || 'Ocurrió un error. Por favor intenta nuevamente';
};

/**
 * Inicia sesión con email y contraseña
 */
export const loginWithEmailAndPassword = async (
  credentials: LoginRequest
): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      credentials.email,
      credentials.password
    );
    return userCredential;
  } catch (error: unknown) {
    const firebaseError = error as { code: string; message: string };
    const message = getFirebaseErrorMessage(firebaseError.code);
    throw new Error(message);
  }
};

/**
 * Inicia sesión con Google usando popup
 *
 * @description Utiliza GoogleAuthProvider para autenticar al usuario con su cuenta de Google.
 * Si el usuario es nuevo, se crea automáticamente una cuenta.
 * El estado de autenticación se actualiza automáticamente mediante onAuthStateChanged.
 */
export const loginWithGoogle = async (): Promise<UserCredential> => {
  try {
    const provider = new GoogleAuthProvider();
    // Solicitar permisos adicionales si es necesario
    provider.addScope('profile');
    provider.addScope('email');

    const userCredential = await signInWithPopup(firebaseAuth, provider);
    return userCredential;
  } catch (error: unknown) {
    const firebaseError = error as { code: string; message: string };
    const message = getFirebaseErrorMessage(firebaseError.code);
    throw new Error(message);
  }
};

/**
 * Registra un nuevo usuario con email y contraseña
 * Actualiza el perfil con nombre y apellido
 */
export const registerWithEmailAndPassword = async (
  data: RegisterRequest
): Promise<UserCredential> => {
  try {
    // Crear usuario
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      data.email,
      data.password
    );

    // Actualizar perfil con nombre completo
    await updateProfile(userCredential.user, {
      displayName: `${data.firstName} ${data.lastName}`,
    });

    return userCredential;
  } catch (error: unknown) {
    const firebaseError = error as { code: string; message: string };
    const message = getFirebaseErrorMessage(firebaseError.code);
    throw new Error(message);
  }
};

/**
 * Envía email de recuperación de contraseña
 */
export const sendPasswordReset = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(firebaseAuth, email, {
      url: `${window.location.origin}/login`,
      handleCodeInApp: false,
    });
  } catch (error: unknown) {
    const firebaseError = error as { code: string; message: string };
    // No revelar si el email existe o no por seguridad
    if (firebaseError.code === 'auth/user-not-found') {
      // Silenciar el error para no revelar emails registrados
      return;
    }
    const message = getFirebaseErrorMessage(firebaseError.code);
    throw new Error(message);
  }
};

/**
 * Cierra sesión del usuario actual
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(firebaseAuth);
  } catch (error: unknown) {
    const firebaseError = error as { code: string; message: string };
    const message = getFirebaseErrorMessage(firebaseError.code);
    throw new Error(message);
  }
};

/**
 * Obtiene el token de autenticación del usuario actual
 */
export const getIdToken = async (forceRefresh = false): Promise<string | null> => {
  try {
    const user = firebaseAuth.currentUser;
    if (!user) {
      return null;
    }
    return await user.getIdToken(forceRefresh);
  } catch (error) {
    console.error('Error obteniendo token:', error);
    return null;
  }
};

/**
 * Convierte un User de Firebase a nuestro tipo User
 *
 * @description Mapea el usuario de Firebase a nuestro tipo User de la aplicación:
 * - Extrae firstName y lastName del displayName de forma segura
 * - Obtiene fechas desde metadata_ de Firebase
 * - Maneja valores nulos/undefined correctamente
 * - Retorna null si no hay usuario de Firebase
 */
export const mapFirebaseUserToAppUser = (firebaseUser: FirebaseUser | null): AppUser | null => {
  if (!firebaseUser) {
    return null;
  }

  // Extraer nombre y apellido del displayName de forma segura
  const displayName = firebaseUser.displayName?.trim() || '';
  let firstName = '';
  let lastName = '';

  if (displayName) {
    const nameParts = displayName.split(/\s+/).filter((part) => part.length > 0);
    if (nameParts.length > 0) {
      firstName = nameParts[0];
      // Si hay más de una palabra, el resto es el apellido
      if (nameParts.length > 1) {
        lastName = nameParts.slice(1).join(' ');
      }
    }
  }

  // Si no hay displayName, usar email como fallback para firstName
  if (!firstName && firebaseUser.email) {
    const emailName = firebaseUser.email.split('@')[0];
    firstName = emailName || 'Usuario';
  } else if (!firstName) {
    firstName = 'Usuario';
  }

  // Obtener fechas de creación y actualización desde metadata
  // Firebase metadata puede tener creationTime y lastSignInTime como strings o null
  const creationTime = firebaseUser.metadata.creationTime;
  const lastSignInTime = firebaseUser.metadata.lastSignInTime;

  // Convertir a ISO string o usar fecha actual como fallback
  const createdAt = creationTime
    ? new Date(creationTime).toISOString()
    : new Date().toISOString();

  const updatedAt = lastSignInTime
    ? new Date(lastSignInTime).toISOString()
    : createdAt;

  // Validar que el email existe (debería siempre existir en usuarios autenticados)
  const email = firebaseUser.email;
  if (!email) {
    console.warn('Usuario de Firebase sin email:', firebaseUser.uid);
    return null;
  }

  return {
    id: firebaseUser.uid,
    email,
    firstName,
    lastName,
    role: 'USER',
    createdAt,
  };
};
