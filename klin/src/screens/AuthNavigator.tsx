import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SignUpScreen, SignInScreen, OnboardingScreen } from './index';
import { useAuthContext } from '../context/AuthContext';
import { useHousehold } from '../hooks/useHousehold';
import { Colors } from '../constants';

type AuthMode = 'signIn' | 'signUp' | 'onboarding';

interface AuthNavigatorProps {
  onOnboardingComplete?: () => void;
}

export const AuthNavigator: React.FC<AuthNavigatorProps> = ({ onOnboardingComplete }) => {
  const { user, loading: authLoading } = useAuthContext();
  const [mode, setMode] = useState<AuthMode>('signIn');
  const { createHousehold, joinHousehold, loading: householdLoading } = useHousehold();

  // Loading state
  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // If user is logged in, show onboarding
  if (user) {
    return (
      <OnboardingScreen
        onCreateHousehold={async (name) => {
          await createHousehold(name);
          onOnboardingComplete?.();
        }}
        onJoinHousehold={async (code) => {
          await joinHousehold(code);
          onOnboardingComplete?.();
        }}
        loading={householdLoading}
      />
    );
  }

  // Show auth screens
  return (
    <>
      {mode === 'signIn' && (
        <SignInScreen
          onSuccess={() => setMode('onboarding')}
          onToggleMode={() => setMode('signUp')}
        />
      )}
      {mode === 'signUp' && (
        <SignUpScreen
          onSuccess={() => setMode('onboarding')}
          onToggleMode={() => setMode('signIn')}
        />
      )}
    </>
  );
};
