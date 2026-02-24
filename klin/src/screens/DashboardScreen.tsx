import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useAuthContext } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Colors, TextStyles } from '../constants';

interface DashboardScreenProps {
  onLogOut?: () => Promise<void>;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onLogOut }) => {
  const { user, signOut } = useAuthContext();
  const [loading, setLoading] = React.useState(false);

  const handleLogOut = async () => {
    setLoading(true);
    try {
      await signOut();
      onLogOut?.();
    } catch (err) {
      console.error('Sign out error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Welcome Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Bienvenue, {user?.name || 'User'}!</Text>
        <Text style={styles.subtitle}>Gestion de tâches ménagères</Text>
      </View>

      {/* Status Box */}
      <View style={styles.statusBox}>
        <Text style={styles.statusTitle}>📊 Votre tableau de bord</Text>
        <View style={styles.statusContent}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Tâches today</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
        </View>
      </View>

      {/* Coming Soon Box */}
      <View style={styles.comingBox}>
        <Text style={styles.comingTitle}>🚀 En développement</Text>
        <Text style={styles.comingText}>
          Les fonctionnalités suivantes arriveront bientôt:
        </Text>
        <View style={styles.featureList}>
          <Text style={styles.feature}>✅ Gestion des tâches</Text>
          <Text style={styles.feature}>🏆 Système de points et badges</Text>
          <Text style={styles.feature}>🔥 Streaks</Text>
          <Text style={styles.feature}>📊 Leaderboard</Text>
          <Text style={styles.feature}>📱 Notifications</Text>
        </View>
      </View>

      {/* User Info */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Informations de compte</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{user?.email}</Text>
        </View>
      </View>

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
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    ...TextStyles.h2,
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    ...TextStyles.body,
    color: Colors.textSecondary,
  },
  statusBox: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statusTitle: {
    ...TextStyles.h4,
    color: Colors.text,
    marginBottom: 12,
  },
  statusContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...TextStyles.h3,
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    ...TextStyles.caption,
    color: Colors.textSecondary,
  },
  comingBox: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  comingTitle: {
    ...TextStyles.h4,
    color: Colors.primaryDark,
    marginBottom: 8,
  },
  comingText: {
    ...TextStyles.body,
    color: Colors.primaryDark,
    marginBottom: 12,
  },
  featureList: {
    gap: 8,
  },
  feature: {
    ...TextStyles.body,
    color: Colors.primaryDark,
  },
  infoBox: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoTitle: {
    ...TextStyles.h4,
    color: Colors.text,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    ...TextStyles.label,
    color: Colors.textSecondary,
  },
  infoValue: {
    ...TextStyles.label,
    color: Colors.text,
  },
  signOutButton: {
    marginBottom: 40,
  },
});
