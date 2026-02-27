import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '../src/context/AuthContext';
import { AppNavigator } from '../src/screens/AppNavigator';

export default function RootApp() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
