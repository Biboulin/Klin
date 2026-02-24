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
  ActivityIndicator,
} from 'react-native';
import { Button } from '../components/Button';
import { Colors, TextStyles } from '../constants';

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
      Alert.alert('Error', 'Please enter a household name');
      return;
    }
    try {
      await onCreateHousehold(householdName);
    } catch (err) {
      Alert.alert('Error', 'Failed to create household');
    }
  };

  const handleJoin = async () => {
    if (!inviteCode.trim()) {
      Alert.alert('Error', 'Please enter an invite code');
      return;
    }
    try {
      await onJoinHousehold(inviteCode);
    } catch (err) {
      Alert.alert('Error', 'Invalid invite code');
    }
  };

  if (mode === 'choice') {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Bienvenue sur Klin!</Text>
            <Text style={styles.subtitle}>
              Gérez vos tâches ménagères en famille
            </Text>
          </View>

          {/* Choice Buttons */}
          <View style={styles.choiceContainer}>
            <View style={styles.choiceBox}>
              <Text style={styles.choiceEmoji}>🏠</Text>
              <Text style={styles.choiceTitle}>Créer un foyer</Text>
              <Text style={styles.choiceDescription}>
                Lancez un nouveau ménage et invitez vos colocataires
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
                Rejoignez un foyer existant via un lien d'invitation
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
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Créer un foyer</Text>
            <Text style={styles.subtitle}>
              Donnez un nom à votre ménage
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nom du foyer</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Appartement 42, Maison de campagne"
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
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Rejoindre un foyer</Text>
            <Text style={styles.subtitle}>
              Scannez le code QR ou collez le lien d'invitation
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Code d'invitation</Text>
              <TextInput
                style={styles.input}
                placeholder="Entrez le code ou le lien"
                value={inviteCode}
                onChangeText={setInviteCode}
                editable={!loading}
                placeholderTextColor={Colors.darkGray}
              />
            </View>

            <View style={styles.scanHint}>
              <Text style={styles.scanHintText}>
                📱 Vous pouvez aussi scannez le code QR dans les paramètres
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
  choiceContainer: {
    gap: 16,
  },
  choiceBox: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  choiceEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  choiceTitle: {
    ...TextStyles.h4,
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  choiceDescription: {
    ...TextStyles.bodySmall,
    color: Colors.textSecondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  choiceButton: {
    alignSelf: 'stretch',
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
  scanHint: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  scanHintText: {
    ...TextStyles.bodySmall,
    color: Colors.primaryDark,
  },
  button: {
    marginBottom: 12,
  },
});
