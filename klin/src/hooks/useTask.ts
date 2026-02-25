import { useState } from 'react';
import { supabase } from '../services/supabase';
import { useAuthContext } from '../context/AuthContext';
import type { TaskTemplate, TaskInstance } from '../types';

export const useTask = (householdId: string | null) => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create task template
  const createTask = async (
    title: string,
    recurrence: 'daily' | 'weekly' | 'oneoff',
    dueDayOfWeek?: number,
    description?: string,
    emoji?: string
  ): Promise<string> => {
    if (!user || !householdId) throw new Error('User or household not set');

    try {
      setLoading(true);
      setError(null);

      const { data, error: taskError } = await supabase
        .from('tasks')
        .insert({
          household_id: householdId,
          title,
          description,
          emoji,
          recurrence,
          due_day_of_week: dueDayOfWeek,
          created_by: user.id,
          created_at: new Date(),
        })
        .select()
        .single();

      if (taskError) throw taskError;
      return data.id;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create task';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get all tasks for household
  const getTasks = async (): Promise<TaskTemplate[]> => {
    if (!householdId) throw new Error('Household not set');

    try {
      setLoading(true);
      setError(null);

      const { data, error: tasksError } = await supabase
        .from('tasks')
        .select('*')
        .eq('household_id', householdId)
        .order('created_at', { ascending: false });

      if (tasksError) throw tasksError;
      return data || [];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch tasks';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get task instances for a date range
  const getTaskInstances = async (
    startDate: Date,
    endDate: Date
  ): Promise<TaskInstance[]> => {
    if (!householdId) throw new Error('Household not set');

    try {
      setLoading(true);
      setError(null);

      const { data, error: instancesError } = await supabase
        .from('task_instances')
        .select('*')
        .eq('household_id', householdId)
        .gte('due_date', startDate.toISOString().split('T')[0])
        .lte('due_date', endDate.toISOString().split('T')[0])
        .order('due_date', { ascending: true });

      if (instancesError) throw instancesError;
      return data || [];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch task instances';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get today's tasks
  const getTodayTasks = async (): Promise<TaskInstance[]> => {
    const today = new Date();
    return getTaskInstances(today, today);
  };

  // Mark task as done
  const completeTaskInstance = async (
    instanceId: string,
    photoUrl?: string
  ): Promise<void> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setLoading(true);
      setError(null);

      const { error: updateError } = await supabase
        .from('task_instances')
        .update({
          completed_at: new Date(),
          completed_by: user.id,
          photo_url: photoUrl,
          points_awarded: 1, // Basic: 1 point per task
        })
        .eq('id', instanceId);

      if (updateError) throw updateError;

      // TODO: Update streaks and points here
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to complete task';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const deleteTask = async (taskId: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const { error: deleteError } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (deleteError) throw deleteError;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete task';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createTask,
    getTasks,
    getTaskInstances,
    getTodayTasks,
    completeTaskInstance,
    deleteTask,
    loading,
    error,
  };
};
