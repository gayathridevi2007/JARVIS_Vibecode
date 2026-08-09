export type UserRole = 'student' | 'recruiter' | 'admin';

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role?: UserRole;
};

const AUTH_STORAGE_KEY = 'abtalks-auth-session';

export function readStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const storedValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(storedValue) as AuthUser;

    if (!parsed?.id || !parsed?.email) {
      return null;
    }

    return parsed;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function persistUser(user: AuthUser) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function buildAuthHeaders(user: AuthUser | null | undefined) {
  const headers: Record<string, string> = {};

  if (user?.id) {
    headers['x-user-id'] = user.id;
  }

  if (user?.email) {
    headers['x-user-email'] = user.email;
  }

  return headers;
}