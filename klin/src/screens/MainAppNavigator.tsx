import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { DashboardScreen } from './DashboardScreen';
import { TaskListScreen } from './TaskListScreen';
import { CreateTaskScreen } from './CreateTaskScreen';
import { MarkDoneScreen } from './MarkDoneScreen';
import { Colors } from '../constants';
import type { TaskInstance } from '../types';

export type RootStackParamList = {
  Dashboard: { householdId: string; onLogOut?: () => Promise<void> };
  TaskList: { householdId: string };
  CreateTask: { householdId: string };
  MarkDone: { householdId: string; task: TaskInstance };
};

export type MainAppNavigationProp = StackNavigationProp<RootStackParamList>;
export type ScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

interface MainAppNavigatorProps {
  householdId: string | null;
  onLogOut?: () => Promise<void>;
}

export const MainAppNavigator: React.FC<MainAppNavigatorProps> = ({
  householdId,
  onLogOut,
}) => {
  if (!householdId) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.background,
            borderBottomColor: Colors.border,
            borderBottomWidth: 1,
          },
          headerTintColor: Colors.primary,
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
            color: Colors.text,
          },
          cardStyle: {
            backgroundColor: Colors.background,
          },
        }}
      >
        <Stack.Screen
          name="Dashboard"
          options={{
            headerShown: false,
          }}
          initialParams={{ householdId, onLogOut }}
          component={DashboardScreen}
        />
        <Stack.Screen
          name="TaskList"
          options={{
            title: 'Tâches',
            headerBackTitle: 'Retour',
          }}
          initialParams={{ householdId }}
          component={TaskListScreen}
        />
        <Stack.Screen
          name="CreateTask"
          options={{
            title: 'Créer une tâche',
            headerBackTitle: 'Annuler',
          }}
          initialParams={{ householdId }}
          component={CreateTaskScreen}
        />
        <Stack.Screen
          name="MarkDone"
          options={{
            title: 'Marquer comme fait',
            headerBackTitle: 'Retour',
          }}
          initialParams={{ householdId, task: {} as TaskInstance }}
          component={MarkDoneScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
