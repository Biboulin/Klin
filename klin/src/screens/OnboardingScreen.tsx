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
import { Button } from '../components/Button';
import { Colors } from '../constants';

type OnboardingMode = 'choice' | 'create' | 'join';

interface OnboardingScreenProps {
  onCreateHousehold: (name: string) => Promise<void>;
  onJoinHousehold: (inviteCode: string) => Promise<void>;
  loading?: boolean;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onCreateHousehold,
  onJoinHousehold,
  loading = false,
}) => {
  const [mode, setMode] = useState<OnboardingMode>('choice');
  const [householdName, setHouseholdName] = useState('');
  const [inviteCode, setInviteCode] = useState('');

  const handleCreate = async () => {
    if (!householdName.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un nom de foyer');
      return;
    }
    try {
      await onCreateHousehold(householdName);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Impossible de créer le foyer';
      Alert.alert('Erreur', errorMsg);
    }
  };

  const handleJoin = async () => {
    if (!inviteCode.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un code d\'invitation');
      return;
    }
    try {
      await onJoinHousehold(inviteCode);
    } catch (err) {
      Alert.alert('Erreur', 'Code invalide');
    }
  };

  if (mode === 'choice') {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Compact Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Bienvenue!</Text>
            <Text style={styles.subtitle}>Gérez vos tâches ménagères</Text>
          </View>

          {/* Choice Buttons */}
          <View style={styles.choiceContainer}>
            <View style={styles.choiceBox}>
              <Text style={styles.choiceEmoji}>🏠</Text>
              <Text style={styles.choiceTitle}>Créer un foyer</Text>
              <Text style={styles.choiceDescription}>
                Lancez un nouveau ménage
              </Text>
              <Button
                title="Créer"
                onPress={() => setMode('create')}
                variant="primary"
                size="md"
                style={styles.choiceButton}
              />
            </View>

            <View style={styles.choiceBox}>
              <Text style={styles.choiceEmoji}>➕</Text>
              <Text style={styles.choiceTitle}>Rejoindre</Text>
              <Text style={styles.choiceDescription}>
                Rejoignez un foyer existant
              </Text>
              <Button
                title="Rejoindre"
                onPress={() => setMode('join')}
                variant="secondary"
                size="md"
                style={styles.choiceButton}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  if (mode === 'create') {
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
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Créer un foyer</Text>
            <Text style={styles.subtitle}>Donnez un nom à votre ménage</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nom du foyer</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Appart 42"
                value={householdName}
                onChangeText={setHouseholdName}
                editable={!loading}
                placeholderTextColor={Colors.darkGray}
              />
            </View>
          </View>

          {/* Buttons */}
          <Button
            title="Créer"
            onPress={handleCreate}
            loading={loading}
            variant="primary"
            size="lg"
            style={styles.button}
          />

          <Button
            title="Retour"
            onPress={() => {
              setMode('choice');
              setHouseholdName('');
            }}
            variant="secondary"
            size="lg"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  if (mode === 'join') {
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
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Rejoindre un foyer</Text>
            <Text style={styles.subtitle}>Entrez le code d'invitation</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Code d'invitation</Text>
              <TextInput
                style={styles.input}
                placeholder="Entrez le code"
                value={inviteCode}
                onChangeText={setInviteCode}
                editable={!loading}
                placeholderTextColor={Colors.darkGray}
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.scanHint}>
              <Text style={styles.scanHintText}>
                📱 Vous pouvez aussi scannez le code QR
              </Text>
            </View>
          </View>

          {/* Buttons */}
          <Button
            title="Rejoindre"
            onPress={handleJoin}
            loading={loading}
            variant="primary"
            size="lg"
            style={styles.button}
          />

          <Button
            title="Retour"
            onPress={() => {
              setMode('choice');
              setInviteCode('');
            }}
            variant="secondary"
            size="lg"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return null;
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
    marginBottom: 20,
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
  choiceContainer: {
    gap: 12,
  },
  choiceBox: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  choiceEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  choiceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  choiceDescription: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.textSecondary,
    marginBottom: 12,
    textAlign: 'center',
  },
  choiceButton: {
    alignSelf: 'stretch',
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
  scanHint: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
  },
  scanHintText: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.primaryDark,
  },
  button: {
    marginBottom: 10,
  },
});
