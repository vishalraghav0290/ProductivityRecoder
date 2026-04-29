/**
 * Frontend-only auth utilities using localStorage.
 *
 * Stores users and current session locally:
 * - USERS_KEY: array of registered users (email + password)
 * - CURRENT_USER_KEY: the active logged-in user (without password)
 */

type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
};

export type PublicUser = Omit<StoredUser, 'password'>;

const USERS_KEY = 'focuslab_users';
const CURRENT_USER_KEY = 'focuslab_current_user';

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `u_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function loadUsers(): StoredUser[] {
  return safeParse<StoredUser[]>(localStorage.getItem(USERS_KEY)) ?? [];
}

export function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function setCurrentUser(user: PublicUser | null) {
  if (!user) {
    localStorage.removeItem(CURRENT_USER_KEY);
  } else {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }
}

export function getCurrentUser(): PublicUser | null {
  return safeParse<PublicUser>(localStorage.getItem(CURRENT_USER_KEY));
}

export function isAuthenticated(): boolean {
  return !!getCurrentUser();
}

export function logoutUser() {
  setCurrentUser(null);
}

export function registerUser(payload: { name: string; email: string; password: string }) {
  const name = payload.name.trim();
  const email = payload.email.trim().toLowerCase();
  const password = payload.password;

  if (!name || !email || !password) {
    return { ok: false, message: 'All fields are required.' };
  }

  const users = loadUsers();
  const exists = users.find(u => u.email === email);
  if (exists) {
    return { ok: false, message: 'User already exists.' };
  }

  const user: StoredUser = {
    id: createId(),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  saveUsers(users);

  return {
    ok: true,
    user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt }
  };
}

export function loginUser(email: string, password: string) {
  const e = email.trim().toLowerCase();
  const p = password;

  if (!e || !p) {
    return { ok: false, message: 'Email and password are required.' };
  }

  const users = loadUsers();
  const user = users.find(u => u.email === e && u.password === p);
  if (!user) {
    return { ok: false, message: 'Invalid email or password.' };
  }

  const publicUser = { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
  setCurrentUser(publicUser);
  return { ok: true, user: publicUser };
}

export default {
  loadUsers,
  saveUsers,
  setCurrentUser,
  getCurrentUser,
  isAuthenticated,
  logoutUser,
  registerUser,
  loginUser,
};
