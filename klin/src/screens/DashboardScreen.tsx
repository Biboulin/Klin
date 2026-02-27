import React from 'react';
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import { useAuthContext } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Colors } from '../constants';
import type { ScreenProps } from './MainAppNavigator';

export const DashboardScreen: React.FC<ScreenProps<'Dashboard'>> = ({ navigation, route }) => {
  const { user, signOut } = useAuthContext();
  const [loading, setLoading] = React.useState(false);
  const { householdId, onLogOut } = route.params;

  const handleLogOut = async () => {
    setLoading(true);
    try {
      await signOut();
      await onLogOut?.();
    } catch (err) {
      console.error('Logout error:', err);
      Alert.alert('Erreur', 'Impossible de se déconnecter');
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.content}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      {/* Welcome Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Bienvenue,</Text>
        <Text style={styles.name}>{user?.name || 'User'} 👋</Text>
      </View>

      {/* Status Box */}
      <View style={styles.statusBox}>
        <Text style={styles.statusTitle}>📊 Votre tableau</Text>
        <View style={styles.statusContent}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Tâches</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
        </View>
      </View>

      {/* Coming Soon */}
      <View style={styles.comingBox}>
        <Text style={styles.comingEmoji}>🚀</Text>
        <Text style={styles.comingTitle}>En développement</Text>
        <Text style={styles.comingText}>
          Les fonctionnalités arrivent très bientôt!
        </Text>
      </View>

      {/* Features */}
      <View style={styles.featuresBox}>
        <Text style={styles.featuresTitle}>✨ À venir</Text>
        <View style={styles.featureList}>
          <Text style={styles.feature}>• Gestion des tâches</Text>
          <Text style={styles.feature}>• Points et badges</Text>
          <Text style={styles.feature}>• Leaderboard</Text>
          <Text style={styles.feature}>• Notifications</Text>
        </View>
      </View>

      {/* Spacer */}
      <View style={styles.spacer} />

      {/* Account Info */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Compte</Text>
        <Text style={styles.infoEmail}>{user?.email}</Text>
      </View>

      {/* View Tasks Button */}
      <Button
        title="Voir les tâches"
        onPress={() => navigation.navigate('TaskList', { householdId })}
        variant="primary"
        size="lg"
        style={styles.taskButton}
      />

      {/* Sign Out Button */}
      <Button
        title="Se déconnecter"
        onPress={handleLogOut}
        loading={loading}
        variant="danger"
        size="lg"
        style={styles.signOutButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 16,
  },
  greeting: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
  },
  statusBox: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  statusContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.border,
  },
  comingBox: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  comingEmoji: {
    fontSize: 32,
    marginBottom: 6,
  },
  comingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primaryDark,
    marginBottom: 4,
  },
  comingText: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  featuresBox: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 10,
  },
  featureList: {
    gap: 6,
  },
  feature: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.text,
  },
  spacer: {
    flex: 1,
    minHeight: 12,
  },
  infoBox: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  infoEmail: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text,
  },
  taskButton: {
    marginBottom: 12,
  },
  signOutButton: {
    marginBottom: 12,
  },
});
