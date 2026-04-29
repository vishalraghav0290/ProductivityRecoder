import { getCurrentUser } from './auth';
import type { Habit, HabitData } from '../components/HabitTracker/types';

const HABITS_KEY = (userId: string) => `habitTracker_habits_${userId}`;
const DATA_KEY = (userId: string) => `habitTracker_data_${userId}`;
const META_KEY = (userId: string) => `habitTracker_meta_${userId}`;

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function loadHabitsForUser(userId: string) {
  return safeParse<Habit[]>(localStorage.getItem(HABITS_KEY(userId)));
}

export function saveHabitsForUser(userId: string, habits: Habit[]) {
  localStorage.setItem(HABITS_KEY(userId), JSON.stringify(habits));
}

export function loadHabitDataForUser(userId: string) {
  return safeParse<HabitData>(localStorage.getItem(DATA_KEY(userId)));
}

export function saveHabitDataForUser(userId: string, data: HabitData) {
  localStorage.setItem(DATA_KEY(userId), JSON.stringify(data));
}

export function loadMetaForUser(userId: string) {
  return safeParse<{ createdAt: string }>(localStorage.getItem(META_KEY(userId)));
}

export function saveMetaForUser(userId: string, meta: { createdAt: string }) {
  localStorage.setItem(META_KEY(userId), JSON.stringify(meta));
}

// Initialize a new user's data: default habits list and empty (0) habit arrays
export function initializeUserData(userId: string, daysInMonth: number) {
  const defaultHabits: Habit[] = [
    { id: 0, name: 'Wake up at 05:00', icon: '⏰', goal: 30 },
    { id: 1, name: 'Gym', icon: '💪', goal: 30 },
    { id: 2, name: 'Reading Learning', icon: '📚', goal: 30 },
    { id: 3, name: 'Day Planning', icon: '📝', goal: 30 },
    { id: 4, name: 'Budget Tracking', icon: '💰', goal: 30 },
    { id: 5, name: 'Project Work', icon: '💼', goal: 30 },
    { id: 6, name: 'No Alcohol', icon: '🚫', goal: 30 },
    { id: 7, name: 'Social Media Detox', icon: '📱', goal: 30 },
    { id: 8, name: 'Goal Journaling', icon: '📔', goal: 30 },
    { id: 9, name: 'Cold Shower', icon: '🚿', goal: 30 }
  ];

  const data: HabitData = {} as HabitData;
  for (const h of defaultHabits) {
    data[h.id] = new Array<number>(daysInMonth).fill(0);
  }

  saveHabitsForUser(userId, defaultHabits);
  saveHabitDataForUser(userId, data);
  saveMetaForUser(userId, { createdAt: new Date().toISOString() });

  return { habits: defaultHabits, data };
}

// Helper: get effective userId (fall back to 'anon' for no-auth mode)
export function getActiveUserId(): string {
  const u = getCurrentUser();
  return u?.id ?? 'anon';
}

export default {
  loadHabitsForUser,
  saveHabitsForUser,
  loadHabitDataForUser,
  saveHabitDataForUser,
  loadMetaForUser,
  saveMetaForUser,
  initializeUserData,
  getActiveUserId
};
