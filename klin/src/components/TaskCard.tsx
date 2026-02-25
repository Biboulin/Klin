import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../constants';

interface TaskCardProps {
  title: string;
  emoji?: string;
  completed: boolean;
  completedAt?: Date;
  dueDate: Date;
  onPress: () => void;
  onLongPress?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  emoji,
  completed,
  completedAt,
  dueDate,
  onPress,
  onLongPress,
}) => {
  const isOverdue = !completed && dueDate < new Date();
  const isToday = 
    new Date(dueDate).toDateString() === new Date().toDateString();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        completed && styles.cardCompleted,
        isOverdue && !completed && styles.cardOverdue,
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          {emoji && <Text style={styles.emoji}>{emoji}</Text>}
          <Text style={[styles.title, completed && styles.titleCompleted]}>
            {title}
          </Text>
        </View>

        <View style={styles.meta}>
          {isToday && (
            <View style={styles.todayBadge}>
              <Text style={styles.todayText}>Today</Text>
            </View>
          )}
          {isOverdue && !completed && (
            <View style={styles.overdueBadge}>
              <Text style={styles.overdueText}>Overdue</Text>
            </View>
          )}
          {completed && (
            <View style={styles.doneBadge}>
              <Text style={styles.doneText}>✓ Done</Text>
            </View>
          )}
        </View>
      </View>

      {completed && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardCompleted: {
    backgroundColor: Colors.lightGray,
    borderLeftColor: Colors.success,
    opacity: 0.7,
  },
  cardOverdue: {
    borderLeftColor: Colors.danger,
    backgroundColor: '#fff5f5',
  },
  content: {
    flex: 1,
    gap: 6,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emoji: {
    fontSize: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text,
    flex: 1,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.textSecondary,
  },
  meta: {
    flexDirection: 'row',
    gap: 6,
  },
  todayBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  todayText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primaryDark,
  },
  overdueBadge: {
    backgroundColor: '#ffe0e0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  overdueText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.danger,
  },
  doneBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  doneText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.white,
  },
  checkmark: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  checkmarkText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700',
  },
});
