import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { DashboardScreen } from './DashboardScreen';
import { AuthNavigator } from './AuthNavigator';
import { useAuthContext } from '../context/AuthContext';
import { Colors } from '../constants';

export const AppNavigator: React.FC = () => {
  const { user, loading } = useAuthContext();
  const [householdCreated, setHouseholdCreated] = useState(false);

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
        onOnboardingComplete={() => {
          setHouseholdCreated(true);
        }}
      />
    );
  }

  // Authenticated and household created
  return (
    <DashboardScreen
      onLogOut={() => {
        setHouseholdCreated(false);
      }}
    />
  );
};
