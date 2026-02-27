import { useState } from 'react';
import { supabase } from '../services/supabase';
import { useAuthContext } from '../context/AuthContext';
import type { Household, HouseholdMember } from '../types';

export const useHousehold = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createHousehold = async (name: string): Promise<string> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setLoading(true);
      setError(null);

      console.log('[HOUSEHOLD] Creating household for user:', user.id);

      // Ensure user exists in public.users (fallback if trigger didn't fire)
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single();

      if (checkError && checkError.code === 'PGRST116') {
        // User doesn't exist, create profile
        console.log('[HOUSEHOLD] User profile missing, creating...');
        const { error: createUserError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email,
            name: user.name,
            timezone: user.timezone || 'UTC',
            created_at: new Date(),
          });

        if (createUserError) {
          console.error('[HOUSEHOLD] Failed to create user profile:', createUserError);
          throw new Error(`User profile creation failed: ${createUserError.message}`);
        }
        console.log('[HOUSEHOLD] User profile created');
      } else if (checkError) {
        console.error('[HOUSEHOLD] Error checking user:', checkError);
        throw checkError;
      }

      // Create household
      const { data: household, error: householdError } = await supabase
        .from('households')
        .insert({
          name,
          created_by: user.id,
          created_at: new Date(),
        })
        .select()
        .single();

      if (householdError) {
        console.error('[HOUSEHOLD] Household creation error:', householdError);
        throw new Error(householdError.message || 'Failed to create household');
      }
      if (!household) throw new Error('Failed to create household');

      console.log('[HOUSEHOLD] Household created:', household.id);

      // Add user as admin member
      const { error: memberError } = await supabase
        .from('household_members')
        .insert({
          household_id: household.id,
          user_id: user.id,
          role: 'admin',
          joined_at: new Date(),
        });

      if (memberError) {
        console.error('[HOUSEHOLD] Member creation error:', memberError);
        throw new Error(memberError.message || 'Failed to add member');
      }

      console.log('[HOUSEHOLD] Member added successfully');
      return household.id;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create household';
      console.error('[HOUSEHOLD] createHousehold error:', message);
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const joinHousehold = async (inviteCode: string): Promise<string> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setLoading(true);
      setError(null);

      // Find household by invite code (simple: household ID = invite code)
      const { data: household, error: householdError } = await supabase
        .from('households')
        .select('id')
        .eq('id', inviteCode.toUpperCase())
        .single();

      if (householdError) {
        throw new Error('Invalid invite code');
      }

      if (!household) {
        throw new Error('Household not found');
      }

      // Check if user is already a member
      const { data: existingMember } = await supabase
        .from('household_members')
        .select('id')
        .eq('household_id', household.id)
        .eq('user_id', user.id)
        .single();

      if (existingMember) {
        throw new Error('You are already a member of this household');
      }

      // Add user as member
      const { error: memberError } = await supabase
        .from('household_members')
        .insert({
          household_id: household.id,
          user_id: user.id,
          role: 'member',
          joined_at: new Date(),
        });

      if (memberError) throw memberError;

      return household.id;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to join household';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createHousehold,
    joinHousehold,
    loading,
    error,
  };
};
