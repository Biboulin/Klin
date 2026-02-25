import React, { useState } from 'react';
import { View } from 'react-native';
import { DashboardScreen } from './DashboardScreen';
import { TaskListScreen } from './TaskListScreen';
import { CreateTaskScreen } from './CreateTaskScreen';
import { MarkDoneScreen } from './MarkDoneScreen';
import { useAuthContext } from '../context/AuthContext';
import type { TaskInstance } from '../types';

type NavigationMode = 'dashboard' | 'taskList' | 'createTask' | 'markDone';

interface MainAppNavigatorProps {
  householdId: string | null;
  onLogOut?: () => Promise<void>;
}

export const MainAppNavigator: React.FC<MainAppNavigatorProps> = ({
  householdId,
  onLogOut,
}) => {
  const [navMode, setNavMode] = useState<NavigationMode>('dashboard');
  const [selectedTask, setSelectedTask] = useState<TaskInstance | null>(null);

  if (navMode === 'dashboard') {
    return (
      <DashboardScreen
        onLogOut={onLogOut}
        onViewTasks={() => setNavMode('taskList')}
      />
    );
  }

  if (navMode === 'taskList') {
    return (
      <TaskListScreen
        householdId={householdId}
        onCreateTask={() => setNavMode('createTask')}
        onTaskPress={(task) => {
          setSelectedTask(task);
          setNavMode('markDone');
        }}
      />
    );
  }

  if (navMode === 'createTask') {
    return (
      <CreateTaskScreen
        householdId={householdId}
        onSuccess={() => setNavMode('taskList')}
        onCancel={() => setNavMode('taskList')}
      />
    );
  }

  if (navMode === 'markDone' && selectedTask) {
    return (
      <MarkDoneScreen
        task={selectedTask}
        onSuccess={() => setNavMode('taskList')}
        onCancel={() => setNavMode('taskList')}
      />
    );
  }

  return <View />;
};
