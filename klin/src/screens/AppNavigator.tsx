import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUpScreen, SignInScreen, OnboardingScreen, DashboardScreen, TaskListScreen, CreateTaskScreen, MarkDoneScreen } from './index';
import { useAuthContext } from '../context/AuthContext';
import { useHousehold } from '../hooks/useHousehold';
import { Colors } from '../constants';
import type { TaskInstance } from '../types';

const HOUSEHOLD_ID_STORAGE_KEY = '@klin_household_id';

export type RootStackParamList = {
  // Auth screens
  SignIn: undefined;
  SignUp: undefined;
  Onboarding: undefined;
  // App screens
  Dashboard: { householdId: string; onLogOut?: () => Promise<void> };
  TaskList: { householdId: string };
  CreateTask: { householdId: string };
  MarkDone: { householdId: string; task: TaskInstance };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { user, loading: authLoading } = useAuthContext();
  const { createHousehold, joinHousehold, loading: householdLoading } = useHousehold();
  const [householdId, setHouseholdId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load persisted household ID on mount
  useEffect(() => {
    const loadHouseholdId = async () => {
      try {
        const stored = await AsyncStorage.getItem(HOUSEHOLD_ID_STORAGE_KEY);
        if (stored) {
          console.log('[APP] Loaded persisted household ID:', stored);
          setHouseholdId(stored);
        }
      } catch (err) {
        console.error('[APP] Failed to load household ID:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHouseholdId();
  }, []);

  const handleOnboardingComplete = async (hId: string) => {
    try {
      await AsyncStorage.setItem(HOUSEHOLD_ID_STORAGE_KEY, hId);
      console.log('[APP] Persisted household ID:', hId);
      setHouseholdId(hId);
    } catch (err) {
      console.error('[APP] Failed to persist household ID:', err);
      setHouseholdId(hId);
    }
  };

  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem(HOUSEHOLD_ID_STORAGE_KEY);
      console.log('[APP] Cleared household ID on logout');
      setHouseholdId(null);
    } catch (err) {
      console.error('[APP] Failed to clear household ID:', err);
      setHouseholdId(null);
    }
  };

  if (authLoading || loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // Determine initial route based on auth state
  const initialRouteName = user && householdId ? 'Dashboard' : 'SignIn';

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerBackButtonMenuEnabled: true,
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
          color: Colors.text,
        },
        contentStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      {/* Auth Screens */}
      {!user || !householdId ? (
        <>
          <Stack.Screen
            name="SignIn"
            options={{ headerShown: false }}
            component={SignInScreen}
          />
          <Stack.Screen
            name="SignUp"
            options={{ headerShown: false }}
            component={SignUpScreen}
          />
          <Stack.Screen
            name="Onboarding"
            options={{ headerShown: false }}
            component={(props) => (
              <OnboardingScreen
                {...props}
                onCreateHousehold={async (name) => {
                  const hId = await createHousehold(name);
                  await handleOnboardingComplete(hId);
                }}
                onJoinHousehold={async (code) => {
                  const hId = await joinHousehold(code);
                  await handleOnboardingComplete(hId);
                }}
                loading={householdLoading}
              />
            )}
          />
        </>
      ) : (
        <>
          {/* App Screens */}
          <Stack.Screen
            name="Dashboard"
            options={{ headerShown: false }}
            initialParams={{ householdId, onLogOut: handleLogOut }}
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
        </>
      )}
    </Stack.Navigator>
  );
};
