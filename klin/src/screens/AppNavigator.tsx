import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { MainAppNavigator } from './MainAppNavigator';
import { AuthNavigator } from './AuthNavigator';
import { useAuthContext } from '../context/AuthContext';
import { Colors } from '../constants';

export const AppNavigator: React.FC = () => {
  const { user, loading } = useAuthContext();
  const [householdCreated, setHouseholdCreated] = useState(false);
  const [householdId, setHouseholdId] = useState<string | null>(null);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // Not authenticated or household not created
  if (!user || !householdCreated) {
    return (
      <AuthNavigator
        onOnboardingComplete={(hId) => {
          setHouseholdCreated(true);
          setHouseholdId(hId || null);
        }}
      />
    );
  }

  // Authenticated and household created
  return (
    <MainAppNavigator
      householdId={householdId}
      onLogOut={() => {
        setHouseholdCreated(false);
        setHouseholdId(null);
      }}
    />
  );
};
