import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useAuthContext } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Colors, TextStyles } from '../constants';

interface SignUpScreenProps {
  onSuccess?: () => void;
  onToggleMode?: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSuccess, onToggleMode }) => {
  const { signUp, loading, error } = useAuthContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      await signUp(email, password, name);
      onSuccess?.();
    } catch (err) {
      Alert.alert('Sign Up Failed', error || 'Please try again');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Créer un compte</Text>
          <Text style={styles.subtitle}>Bienvenue sur Klin</Text>
        </View>

        {/* Error message */}
        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Form */}
        <View style={styles.form}>
          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom</Text>
            <TextInput
              style={styles.input}
              placeholder="Votre nom"
              value={name}
              onChangeText={setName}
              editable={!loading}
              placeholderTextColor={Colors.darkGray}
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="votre@email.com"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={Colors.darkGray}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
              style={styles.input}
              placeholder="Min. 6 caractères"
              value={password}
              onChangeText={setPassword}
              editable={!loading}
              secureTextEntry
              placeholderTextColor={Colors.darkGray}
            />
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirmer mot de passe</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              editable={!loading}
              secureTextEntry
              placeholderTextColor={Colors.darkGray}
            />
          </View>
        </View>

        {/* Sign Up Button */}
        <Button
          title="Créer un compte"
          onPress={handleSignUp}
          loading={loading}
          variant="primary"
          size="lg"
          style={styles.button}
        />

        {/* Toggle to Sign In */}
        <View style={styles.toggleBox}>
          <Text style={styles.toggleText}>Vous avez déjà un compte? </Text>
          <Text
            style={[styles.toggleText, styles.toggleLink]}
            onPress={onToggleMode}
          >
            Se connecter
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 32,
  },
  title: {
    ...TextStyles.h2,
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    ...TextStyles.body,
    color: Colors.textSecondary,
  },
  errorBox: {
    backgroundColor: Colors.danger,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  errorText: {
    ...TextStyles.bodySmall,
    color: Colors.white,
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    ...TextStyles.label,
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    ...TextStyles.body,
    backgroundColor: Colors.white,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: Colors.text,
  },
  button: {
    marginBottom: 20,
  },
  toggleBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    ...TextStyles.bodySmall,
    color: Colors.textSecondary,
  },
  toggleLink: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
