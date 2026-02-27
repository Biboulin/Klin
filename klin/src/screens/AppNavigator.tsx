import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainAppNavigator } from './MainAppNavigator';
import { AuthNavigator } from './AuthNavigator';
import { useAuthContext } from '../context/AuthContext';
import { Colors } from '../constants';

const HOUSEHOLD_ID_STORAGE_KEY = '@klin_household_id';

export const AppNavigator: React.FC = () => {
  const { user, loading: authLoading } = useAuthContext();
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

  // Not authenticated or no household ID
  if (!user || !householdId) {
    return (
      <AuthNavigator
        onOnboardingComplete={handleOnboardingComplete}
      />
    );
  }

  // Authenticated and household exists
  return (
    <MainAppNavigator
      householdId={householdId}
      onLogOut={handleLogOut}
    />
  );
};
