/**
 * Frontend auth utilities for storing JWT and user info in localStorage.
 *
 * Exports:
 * - loginUser(token, user) -> stores token and user in localStorage
 * - logoutUser() -> clears auth keys from localStorage
 * - getCurrentUser() -> returns stored user or null
 * - getToken() -> returns stored token or null
 * - isAuthenticated() -> checks token presence and expiry
 *
 * Note: In production you should store tokens carefully (httpOnly cookies are safer),
 * and verify tokens server-side where needed. These helpers are written for a SPA
 * that uses a backend JWT auth API.
 */

const TOKEN_KEY = 'focuslab_token';
const USER_KEY = 'focuslab_current_user';

export function loginUser(token: string, user: { id: string; name: string; email: string }) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function logoutUser() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getCurrentUser(): { id: string; name: string; email: string } | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

// Lightweight JWT expiry check: decode payload and check exp claim.
function parseJwt(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    return payload;
  } catch (e) {
    return null;
  }
}

export function isAuthenticated(): boolean {
  const token = getToken();
  if (!token) return false;
  const payload = parseJwt(token);
  if (!payload) return false;
  if (payload.exp && typeof payload.exp === 'number') {
    // exp is in seconds since epoch
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  }
  // if no exp claim, consider token valid (not ideal)
  return true;
}

export default {
  loginUser,
  logoutUser,
  getCurrentUser,
  getToken,
  isAuthenticated,
};
