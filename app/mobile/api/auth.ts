import { getStorageItem, setStorageItem, removeStorageItem } from '../services/storage';
import { sanitize } from '@/security/sanitizer';
import { validateEmail } from '@/security/validation';
import { RolloApiAuthResponse, User } from '@/utils/types';
import { RolloApiError } from './errors';
import { apiPath } from './api';

export async function authSignUp(
  name: string,
  surname: string,
  email: string,
  password: string,
): Promise<RolloApiAuthResponse> {
  const creds = sanitize({
    name: name,
    surname: surname,
    email: email,
    password: password,
  });

  if (!validateEmail(creds.email)) return { user: null, error: 'Email non valida', message: null };

  try {
    // First, attempt to register
    const res = await fetch(apiPath('/auth/register'), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        nome: creds.name,
        cognome: creds.surname,
        email: creds.email,
        password: creds.password,
      }).toString(),
    });
    if (!res.ok) {
      const data = await res.json();
      return { user: null, ...RolloApiError(data.message, data.error) };
    }

    // if registration successful, attempt to login
    return await authLogin(creds.email, creds.password);
  } catch (error) {
    console.error('Signup error:', error);
    return { user: null, ...RolloApiError(null, 'Errore durante la registrazione') };
  }
}

export async function authLogin(email: string, password: string): Promise<RolloApiAuthResponse> {
  const creds = sanitize({ email: email, password: password });

  // ? dev bypass
  // TODO: remove this thing
  if (creds.email === 'rollo') {
    // When you want to store the session
    const user: User = {
      id: 0,
      nome: 'John',
      cognome: 'Doe',
      email: 'admin@rollo.dev',
      ruolo: 'admin',
      num_token: 325,
    };

    // store the user's data
    await saveUserdata(user);
    // fake a response
    return { user: user, message: null, error: null };
  }

  if (!validateEmail(email)) return { user: null, ...RolloApiError(null, 'Email non valida') };

  try {
    const res = await fetch(apiPath('/auth/login'), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: creds.email,
        password: creds.password,
      }).toString(),
    });

    const data: RolloApiAuthResponse = await res.json();

    if (!res.ok) {
      return { user: null, ...RolloApiError(data.message, data.error) };
    }

    if (data.user) {
      await saveUserdata(data.user);
      return {
        user: data.user,
        message: data.message,
        error: data.error,
      };
    }

    return { user: null, ...RolloApiError(null, 'Risposta dal server non valida') };
  } catch (error) {
    console.error('Login error:', error);
    return { user: null, ...RolloApiError(null, 'Errore durante il login') };
  }
}

export async function authLogout(): Promise<boolean> {
  try {
    const res = await fetch(apiPath('/auth/logout'), {
      method: 'POST',
      credentials: 'include',
    });
    if (res.ok) {
      return await removeUserdata();
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
  return false;
}

export async function fetchUserData(user_id: string): Promise<RolloApiAuthResponse> {
  try {
    const res = await fetch(apiPath('/auth/user') + '?' + new URLSearchParams({ id: user_id }), {
      method: 'GET',
      credentials: 'include',
    });
    const data: RolloApiAuthResponse = await res.json();
    if (res.ok && data.user) {
      await saveUserdata(data.user);
    }
    return data;
  } catch (error) {
    console.error('fetchUserData:', error);
  }
  return { user: null, ...RolloApiError(null, 'Errore nel prendere le nuove informazioni') };
}

export async function getUserdata(): Promise<RolloApiAuthResponse> {
  try {
    const value = await getStorageItem();
    if (!value) {
      return { user: null, ...RolloApiError(null, 'nessun dato salvato') };
    }

    const user = JSON.parse(value);
    return { user, error: null, message: 'Login effettuato con successo' };
  } catch (error) {
    console.error('getUserdata error:', error);
    return { user: null, ...RolloApiError(null, 'Errore durante il caricamento dei dati') };
  }
}

export async function saveUserdata(user: User): Promise<boolean> {
  try {
    const rawValue = JSON.stringify(user);
    return await setStorageItem(rawValue);
  } catch (error) {
    console.error('saveUserdata error:', error);
    return false;
  }
}

export async function removeUserdata(): Promise<boolean> {
  return await removeStorageItem();
}
