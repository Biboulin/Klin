export * from './colors';
export * from './typography';

// API & Services
export const API_CONFIG = {
  TIMEOUT: 10000,
};

// Feature Flags
export const FEATURES = {
  PHOTO_PROOF: true,
  AI_SUGGESTIONS: false, // Phase 2
  ADVANCED_SCHEDULING: false, // Phase 1
};

// Gamification Constants
export const GAMIFICATION = {
  POINTS_PER_TASK: 1,
  POINTS_STREAK_WEEK_1: 5,
  POINTS_STREAK_WEEK_2: 10,
  POINTS_STREAK_MONTH: 20,
  POINTS_PENALTY: 2,

  STREAK_MISS_HOURS: 24,

  // Badge definitions
  BADGES: {
    ON_FIRE: {
      id: 'on_fire',
      name: 'On Fire',
      emoji: '🔥',
      condition: 'streak_14_days',
    },
    RELIABLE: {
      id: 'reliable',
      name: 'Reliable',
      emoji: '👑',
      condition: 'zero_missed_30_days',
    },
    RISING_STAR: {
      id: 'rising_star',
      name: 'Rising Star',
      emoji: '🚀',
      condition: 'points_50_30_days',
    },
    COMMITTED: {
      id: 'committed',
      name: 'Committed',
      emoji: '💪',
      condition: 'tasks_100',
    },
    PERFECTIONIST: {
      id: 'perfectionist',
      name: 'Perfectionist',
      emoji: '🏆',
      condition: 'streak_90_days',
    },
    STAR_PERFORMER: {
      id: 'star_performer',
      name: 'Star Performer',
      emoji: '🌟',
      condition: 'top_1_month',
    },
    ALL_IN: {
      id: 'all_in',
      name: 'All-In',
      emoji: '🎯',
      condition: 'completion_100_week',
    },
    TEAM_PLAYER: {
      id: 'team_player',
      name: 'Team Player',
      emoji: '🤝',
      condition: 'zero_reassignments',
    },
  },
};

// Tasks
export const CORE_TASKS = [
  { id: 'cuisine', name: 'Cuisine', emoji: '👨‍🍳' },
  { id: 'poubelles', name: 'Poubelles', emoji: '🗑️' },
  { id: 'aspirateur', name: 'Aspirateur', emoji: '🧹' },
  { id: 'vaisselle', name: 'Vaisselle', emoji: '🍽️' },
  { id: 'lessive', name: 'Lessive', emoji: '👕' },
  { id: 'salon', name: 'Ranger salon', emoji: '🛋️' },
  { id: 'chambre', name: 'Ranger chambre', emoji: '🛏️' },
];

// Recurrence options
export const RECURRENCE_OPTIONS = [
  { value: 'daily', label: 'Chaque jour' },
  { value: 'weekly', label: 'Chaque semaine' },
  { value: 'oneoff', label: 'Une seule fois' },
];
