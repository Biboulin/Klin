import { useState } from 'react';
import { supabase } from '../services/supabase';
import type { UserStreak, UserPoints, UserBadge } from '../types';

export const useGamification = (householdId: string | null, userId: string | null) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get user points
  const getPoints = async (): Promise<number> => {
    if (!householdId || !userId) throw new Error('Missing ids');

    try {
      setLoading(true);
      const { data, error: pointsError } = await supabase
        .from('user_points')
        .select('total_points')
        .eq('household_id', householdId)
        .eq('user_id', userId)
        .single();

      if (pointsError && pointsError.code !== 'PGRST116') throw pointsError;
      return data?.total_points || 0;
    } catch (err) {
      console.error('Error getting points:', err);
      return 0;
    } finally {
      setLoading(false);
    }
  };

  // Add points
  const addPoints = async (amount: number): Promise<void> => {
    if (!householdId || !userId) throw new Error('Missing ids');

    try {
      setLoading(true);
      setError(null);

      // Get current points
      const { data: existingPoints } = await supabase
        .from('user_points')
        .select('id, total_points')
        .eq('household_id', householdId)
        .eq('user_id', userId)
        .single();

      const newTotal = (existingPoints?.total_points || 0) + amount;

      if (existingPoints) {
        // Update existing
        await supabase
          .from('user_points')
          .update({
            total_points: newTotal,
            last_updated_at: new Date(),
          })
          .eq('id', existingPoints.id);
      } else {
        // Create new
        await supabase.from('user_points').insert({
          user_id: userId,
          household_id: householdId,
          total_points: newTotal,
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add points';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get user streak
  const getStreak = async (): Promise<UserStreak | null> => {
    if (!householdId || !userId) throw new Error('Missing ids');

    try {
      setLoading(true);
      const { data, error: streakError } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('household_id', householdId)
        .eq('user_id', userId)
        .single();

      if (streakError && streakError.code !== 'PGRST116') throw streakError;
      return data || null;
    } catch (err) {
      console.error('Error getting streak:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Increment streak
  const incrementStreak = async (): Promise<number> => {
    if (!householdId || !userId) throw new Error('Missing ids');

    try {
      setLoading(true);

      const now = new Date();
      const existingStreak = await getStreak();

      if (existingStreak) {
        const newStreak = existingStreak.current_streak + 1;
        const { error: updateError } = await supabase
          .from('user_streaks')
          .update({
            current_streak: newStreak,
            last_task_completed_at: now,
            is_active: true,
          })
          .eq('id', existingStreak.id);

        if (updateError) throw updateError;
        return newStreak;
      } else {
        // Create new streak
        const { error: insertError } = await supabase
          .from('user_streaks')
          .insert({
            user_id: userId,
            household_id: householdId,
            current_streak: 1,
            last_task_completed_at: now,
            is_active: true,
            streak_started_at: now,
          });

        if (insertError) throw insertError;
        return 1;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to increment streak';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Break streak
  const breakStreak = async (): Promise<void> => {
    if (!householdId || !userId) throw new Error('Missing ids');

    try {
      setLoading(true);
      const existingStreak = await getStreak();

      if (existingStreak) {
        await supabase
          .from('user_streaks')
          .update({
            is_active: false,
            broken_at: new Date(),
          })
          .eq('id', existingStreak.id);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to break streak';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get user badges
  const getBadges = async (): Promise<UserBadge[]> => {
    if (!householdId || !userId) throw new Error('Missing ids');

    try {
      setLoading(true);
      const { data, error: badgesError } = await supabase
        .from('user_badges')
        .select('*')
        .eq('household_id', householdId)
        .eq('user_id', userId);

      if (badgesError) throw badgesError;
      return data || [];
    } catch (err) {
      console.error('Error getting badges:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Award badge
  const awardBadge = async (badgeId: string): Promise<void> => {
    if (!householdId || !userId) throw new Error('Missing ids');

    try {
      setLoading(true);

      // Check if already earned
      const { data: existing } = await supabase
        .from('user_badges')
        .select('id')
        .eq('user_id', userId)
        .eq('badge_id', badgeId)
        .single();

      if (existing) return; // Already earned

      // Award badge
      const { error: badgeError } = await supabase
        .from('user_badges')
        .insert({
          user_id: userId,
          household_id: householdId,
          badge_id: badgeId,
          earned_at: new Date(),
        });

      if (badgeError) throw badgeError;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to award badge';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    getPoints,
    addPoints,
    getStreak,
    incrementStreak,
    breakStreak,
    getBadges,
    awardBadge,
    loading,
    error,
  };
};
