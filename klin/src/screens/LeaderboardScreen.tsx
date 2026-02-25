import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../constants';
import { supabase } from '../services/supabase';

interface LeaderboardEntry {
  userId: string;
  userName: string;
  points: number;
  streak: number;
  rank: number;
}

interface LeaderboardScreenProps {
  householdId: string | null;
  onGoBack?: () => void;
}

type TimeRange = 'week' | 'month' | 'allTime';

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  householdId,
  onGoBack,
}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLeaderboard();
  }, [householdId, timeRange]);

  const loadLeaderboard = async () => {
    if (!householdId) return;

    try {
      setLoading(true);

      // TODO: Implement time-range filtering based on task_instances.completed_at
      // For MVP, just load all points ordered by total
      const { data, error } = await supabase
        .from('user_points')
        .select(
          `
          user_id,
          total_points,
          users (name)
        `
        )
        .eq('household_id', householdId)
        .order('total_points', { ascending: false })
        .limit(100);

      if (error) throw error;

      const mapped: LeaderboardEntry[] = (data || []).map((entry, idx) => ({
        userId: entry.user_id,
        userName: (entry.users as any)?.name || 'Unknown',
        points: entry.total_points,
        streak: 0, // TODO: Get from user_streaks
        rank: idx + 1,
      }));

      setEntries(mapped);
    } catch (err) {
      console.error('Error loading leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onGoBack}>
          <Text style={styles.backButton}>← Retour</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Classement</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Time Range Tabs */}
      <View style={styles.tabs}>
        {(['week', 'month', 'allTime'] as const).map((range) => (
          <TouchableOpacity
            key={range}
            style={[styles.tab, timeRange === range && styles.tabActive]}
            onPress={() => setTimeRange(range)}
          >
            <Text style={[styles.tabText, timeRange === range && styles.tabTextActive]}>
              {range === 'week' ? 'Semaine' : range === 'month' ? 'Mois' : 'Tout temps'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Leaderboard List */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.centerContent}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : entries.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🏆</Text>
            <Text style={styles.emptyText}>Pas de données</Text>
          </View>
        ) : (
          entries.map((entry, idx) => (
            <View key={entry.userId} style={styles.entry}>
              <View style={styles.rank}>
                <Text style={styles.rankNumber}>#{entry.rank}</Text>
                {entry.rank === 1 && <Text style={styles.medal}>🥇</Text>}
                {entry.rank === 2 && <Text style={styles.medal}>🥈</Text>}
                {entry.rank === 3 && <Text style={styles.medal}>🥉</Text>}
              </View>

              <View style={styles.userInfo}>
                <Text style={styles.userName}>{entry.userName}</Text>
                {entry.streak > 0 && (
                  <Text style={styles.streak}>🔥 {entry.streak} jours</Text>
                )}
              </View>

              <Text style={styles.points}>{entry.points} pts</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.primary,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rank: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  medal: {
    fontSize: 16,
  },
  userInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  streak: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.primary,
  },
  points: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
});
