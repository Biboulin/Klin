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

interface SignInScreenProps {
  onSuccess?: () => void;
  onToggleMode?: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({ onSuccess, onToggleMode }) => {
  const { signIn, loading, error } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer votre email');
      return;
    }
    if (!password) {
      Alert.alert('Erreur', 'Veuillez entrer votre mot de passe');
      return;
    }

    try {
      await signIn(email, password);
      onSuccess?.();
    } catch (err) {
      Alert.alert('Erreur', error || 'Veuillez réessayer');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={10}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Compact Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Se connecter</Text>
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
              autoCorrect={false}
              placeholderTextColor={Colors.darkGray}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
              style={styles.input}
              placeholder="Votre mot de passe"
              value={password}
              onChangeText={setPassword}
              editable={!loading}
              secureTextEntry
              placeholderTextColor={Colors.darkGray}
            />
          </View>
        </View>

        {/* Sign In Button */}
        <Button
          title="Se connecter"
          onPress={handleSignIn}
          loading={loading}
          variant="primary"
          size="lg"
          style={styles.button}
        />

        {/* Toggle to Sign Up */}
        <View style={styles.toggleBox}>
          <Text style={styles.toggleText}>Pas de compte? </Text>
          <Text
            style={[styles.toggleText, styles.toggleLink]}
            onPress={onToggleMode}
          >
            Créer un compte
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textSecondary,
  },
  errorBox: {
    backgroundColor: Colors.danger,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.white,
  },
  form: {
    marginBottom: 20,
    gap: 12,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text,
  },
  input: {
    fontSize: 16,
    backgroundColor: Colors.white,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: Colors.text,
    minHeight: 48,
  },
  button: {
    marginBottom: 16,
  },
  toggleBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textSecondary,
  },
  toggleLink: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
