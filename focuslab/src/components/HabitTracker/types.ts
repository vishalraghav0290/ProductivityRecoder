export type Habit = {
  id: number;
  name: string;
  icon: string;
  goal: number;
};

export type HabitData = Record<number, number[]>;

export type DailyProgress = {
  day: number;
  progress: number;
};

export type HabitStat = {
  goal: number;
  actual: number;
  progress: number;
};

export type Stats = {
  totalCompleted: number;
  totalPossible: number;
  percentage: number;
  dailyProgress: DailyProgress[];
  habitStats: HabitStat[];
};

export type HeaderProps = {
  habitsCount: number;
  totalCompleted: number;
  percentage: number;
  month: string;
};
