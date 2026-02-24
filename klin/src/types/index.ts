// Type definitions for KLIN

export type Recurrence = 'daily' | 'weekly' | 'oneoff';
export type UserRole = 'admin' | 'member';

// User
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  timezone: string;
  createdAt: Date;
}

// Household
export interface Household {
  id: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  createdBy: string;
}

// Household Member
export interface HouseholdMember {
  householdId: string;
  userId: string;
  role: UserRole;
  joinedAt: Date;
}

// Task Template
export interface TaskTemplate {
  id: string;
  householdId: string;
  title: string;
  description?: string;
  emoji?: string;
  recurrence: Recurrence;
  dueDayOfWeek?: number; // 0-6 for weekly tasks
  createdAt: Date;
  createdBy: string;
}

// Task Instance (actual occurrence)
export interface TaskInstance {
  id: string;
  taskId: string;
  householdId: string;
  assignedTo: string;
  dueDate: Date;
  completedAt?: Date;
  completedBy?: string;
  photoUrl?: string;
  pointsAwarded?: number;
}

// User Streak
export interface UserStreak {
  id: string;
  userId: string;
  householdId: string;
  currentStreak: number;
  lastTaskCompletedAt: Date;
  isActive: boolean;
  streakStartedAt: Date;
  broken?: boolean;
  brokenAt?: Date;
}

// User Points
export interface UserPoints {
  id: string;
  userId: string;
  householdId: string;
  totalPoints: number;
  lastUpdatedAt: Date;
}

// Badge
export interface Badge {
  id: string;
  name: string;
  emoji: string;
  condition: string;
  description?: string;
}

// User Badge (earned)
export interface UserBadge {
  id: string;
  userId: string;
  householdId: string;
  badgeId: string;
  earnedAt: Date;
}

// Notification
export type NotificationType = 'task_assigned' | 'reminder' | 'streak_at_risk' | 'badge_earned' | 'task_completed';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: any;
  createdAt: Date;
  readAt?: Date;
}

// Leaderboard Entry
export interface LeaderboardEntry {
  userId: string;
  userName: string;
  points: number;
  streak: number;
  badges: string[];
  tasksCompleted: number;
}

// App State / Redux
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface HouseholdState {
  current: Household | null;
  members: HouseholdMember[];
  tasks: TaskTemplate[];
  taskInstances: TaskInstance[];
  loading: boolean;
  error: string | null;
}

export interface GamificationState {
  streaks: { [userId: string]: UserStreak };
  points: { [userId: string]: UserPoints };
  badges: UserBadge[];
  leaderboard: LeaderboardEntry[];
}
