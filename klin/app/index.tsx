import React from 'react';
import { AuthProvider } from '../src/context/AuthContext';
import { AppNavigator } from '../src/screens/AppNavigator';

export default function RootApp() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
