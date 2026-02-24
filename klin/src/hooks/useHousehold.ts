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

      if (householdError) throw householdError;
      if (!household) throw new Error('Failed to create household');

      // Add user as admin member
      const { error: memberError } = await supabase
        .from('household_members')
        .insert({
          household_id: household.id,
          user_id: user.id,
          role: 'admin',
          joined_at: new Date(),
        });

      if (memberError) throw memberError;

      return household.id;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create household';
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
