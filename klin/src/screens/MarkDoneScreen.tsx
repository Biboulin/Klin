import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../components/Button';
import { Colors } from '../constants';
import { useTask } from '../hooks/useTask';
import type { TaskInstance } from '../types';
import type { RootStackParamList } from './AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'MarkDone'>;

export const MarkDoneScreen: React.FC<Props> = ({ navigation, route }) => {
  const { householdId, task } = route.params;
  const { completeTaskInstance, loading } = useTask(householdId);
  const [addPhoto, setAddPhoto] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const handleMarkDone = async () => {
    try {
      await completeTaskInstance(task.id, photoUri || undefined);
      Alert.alert('Bravo! 🎉', 'Tâche marquée comme complétée!');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de marquer comme complétée');
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Marquer comme fait</Text>
      </View>

      {/* Task Info */}
      <View style={styles.taskBox}>
        <Text style={styles.taskTitle}>{task.task_id || 'Task'}</Text>
        <Text style={styles.dueDate}>
          À faire: {new Date(task.due_date).toLocaleDateString('fr-FR')}
        </Text>
      </View>

      {/* Confirmation */}
      <View style={styles.confirmBox}>
        <Text style={styles.checkmark}>✓</Text>
        <Text style={styles.confirmText}>Vous avez terminé cette tâche?</Text>
      </View>

      {/* Photo Option (MVP: simple toggle) */}
      <View style={styles.section}>
        <Text style={styles.label}>Preuve photo (optionnel)</Text>
        <TouchableOpacity
          style={[styles.photoToggle, addPhoto && styles.photoToggleActive]}
          onPress={() => setAddPhoto(!addPhoto)}
        >
          <Text style={styles.photoToggleText}>
            {addPhoto ? '📸 Avec photo' : '📷 Ajouter une photo'}
          </Text>
        </TouchableOpacity>
        {addPhoto && (
          <View style={styles.photoHint}>
            <Text style={styles.photoHintText}>
              📱 Fonctionnalité camera à venir dans v1.1
            </Text>
          </View>
        )}
      </View>

      {/* Points Info */}
      <View style={styles.pointsBox}>
        <Text style={styles.pointsTitle}>+1 point</Text>
        <Text style={styles.pointsSubtext}>Pour cette tâche complétée</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttons}>
        <Button
          title="Confirmer"
          onPress={handleMarkDone}
          loading={loading}
          variant="primary"
          size="lg"
        />
        <Button
          title="Annuler"
          onPress={() => navigation.goBack()}
          variant="secondary"
          size="lg"
        />
      </View>
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
  },
  taskBox: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  dueDate: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.textSecondary,
  },
  confirmBox: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  checkmark: {
    fontSize: 48,
    marginBottom: 8,
  },
  confirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  photoToggle: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  photoToggleActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  photoToggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    textAlign: 'center',
  },
  photoHint: {
    marginTop: 8,
    backgroundColor: Colors.lightGray,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  photoHintText: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.textSecondary,
  },
  pointsBox: {
    backgroundColor: Colors.success,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  pointsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 4,
  },
  pointsSubtext: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.8)',
  },
  buttons: {
    gap: 10,
  },
});
