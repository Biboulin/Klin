import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { TaskCard } from '../components/TaskCard';
import { Button } from '../components/Button';
import { Colors } from '../constants';
import { useTask } from '../hooks/useTask';
import type { TaskInstance } from '../types';

interface TaskListScreenProps {
  householdId: string | null;
  onCreateTask: () => void;
  onTaskPress: (task: TaskInstance) => void;
}

type ViewMode = 'today' | 'week';

export const TaskListScreen: React.FC<TaskListScreenProps> = ({
  householdId,
  onCreateTask,
  onTaskPress,
}) => {
  const { getTodayTasks, getTaskInstances, loading } = useTask(householdId);
  const [viewMode, setViewMode] = useState<ViewMode>('today');
  const [tasks, setTasks] = useState<TaskInstance[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadTasks = async () => {
    try {
      if (viewMode === 'today') {
        const todayTasks = await getTodayTasks();
        setTasks(todayTasks);
      } else {
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 7);
        const weekTasks = await getTaskInstances(startDate, endDate);
        setTasks(weekTasks);
      }
    } catch (err) {
      console.error('Error loading tasks:', err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [viewMode, householdId]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  const completedCount = tasks.filter((t) => t.completed_at).length;
  const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Tâches</Text>
          <Text style={styles.subtitle}>
            {completedCount} sur {tasks.length} complétées
          </Text>
        </View>
        <Button
          title="Ajouter"
          onPress={onCreateTask}
          variant="primary"
          size="sm"
        />
      </View>

      {/* Completion Bar */}
      {tasks.length > 0 && (
        <View style={styles.progressBox}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${completionRate}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>{completionRate}% complétées</Text>
        </View>
      )}

      {/* View Mode Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, viewMode === 'today' && styles.tabActive]}
          onPress={() => setViewMode('today')}
        >
          <Text style={[styles.tabText, viewMode === 'today' && styles.tabTextActive]}>
            Aujourd'hui
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, viewMode === 'week' && styles.tabActive]}
          onPress={() => setViewMode('week')}
        >
          <Text style={[styles.tabText, viewMode === 'week' && styles.tabTextActive]}>
            Semaine
          </Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <ScrollView
        style={styles.taskList}
        contentContainerStyle={styles.taskListContent}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.centerContent}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>✨</Text>
            <Text style={styles.emptyText}>Aucune tâche</Text>
            <Text style={styles.emptySubtext}>
              {viewMode === 'today'
                ? "Vous êtes à jour pour aujourd'hui!"
                : 'Rien à faire cette semaine'}
            </Text>
          </View>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.task_id || 'Unknown'}
              emoji="📋"
              completed={!!task.completed_at}
              completedAt={task.completed_at ? new Date(task.completed_at) : undefined}
              dueDate={new Date(task.due_date)}
              onPress={() => onTaskPress(task)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.textSecondary,
  },
  progressBox: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 6,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.success,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.primary,
  },
  taskList: {
    flex: 1,
  },
  taskListContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
    paddingHorizontal: 20,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
