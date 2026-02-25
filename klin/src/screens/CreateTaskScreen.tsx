import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Button } from '../components/Button';
import { Colors } from '../constants';
import { CORE_TASKS } from '../constants';
import { useTask } from '../hooks/useTask';

interface CreateTaskScreenProps {
  householdId: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

type Recurrence = 'daily' | 'weekly' | 'oneoff';

export const CreateTaskScreen: React.FC<CreateTaskScreenProps> = ({
  householdId,
  onSuccess,
  onCancel,
}) => {
  const { createTask, loading } = useTask(householdId);
  const [title, setTitle] = useState('');
  const [recurrence, setRecurrence] = useState<Recurrence>('weekly');
  const [selectedEmoji, setSelectedEmoji] = useState<string | undefined>();
  const [description, setDescription] = useState('');

  const handleCreate = async () => {
    if (!title.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un nom de tâche');
      return;
    }

    try {
      await createTask(
        title,
        recurrence,
        recurrence === 'weekly' ? 0 : undefined,
        description || undefined,
        selectedEmoji
      );
      Alert.alert('Succès', 'Tâche créée!');
      onSuccess();
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de créer la tâche');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={10}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Nouvelle tâche</Text>
        </View>

        {/* Emoji Picker */}
        <View style={styles.section}>
          <Text style={styles.label}>Emoji (optionnel)</Text>
          <View style={styles.emojiGrid}>
            {CORE_TASKS.map((task) => (
              <TouchableOpacity
                key={task.id}
                style={[
                  styles.emojiButton,
                  selectedEmoji === task.emoji && styles.emojiButtonSelected,
                ]}
                onPress={() => setSelectedEmoji(task.emoji)}
              >
                <Text style={styles.emojiText}>{task.emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Title Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Nom de la tâche *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Laver les tapis"
            value={title}
            onChangeText={setTitle}
            editable={!loading}
            placeholderTextColor={Colors.darkGray}
          />
        </View>

        {/* Description Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Description (optionnel)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Détails supplémentaires"
            value={description}
            onChangeText={setDescription}
            editable={!loading}
            placeholderTextColor={Colors.darkGray}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Recurrence Selector */}
        <View style={styles.section}>
          <Text style={styles.label}>Fréquence</Text>
          <View style={styles.recurrenceButtons}>
            {['daily', 'weekly', 'oneoff'].map((rec) => (
              <TouchableOpacity
                key={rec}
                style={[
                  styles.recurrenceButton,
                  recurrence === rec && styles.recurrenceButtonActive,
                ]}
                onPress={() => setRecurrence(rec as Recurrence)}
              >
                <Text
                  style={[
                    styles.recurrenceText,
                    recurrence === rec && styles.recurrenceTextActive,
                  ]}
                >
                  {rec === 'daily'
                    ? 'Chaque jour'
                    : rec === 'weekly'
                    ? 'Chaque semaine'
                    : 'Une seule fois'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttons}>
          <Button
            title="Créer"
            onPress={handleCreate}
            loading={loading}
            variant="primary"
            size="lg"
          />
          <Button
            title="Annuler"
            onPress={onCancel}
            variant="secondary"
            size="lg"
          />
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
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emojiButton: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
  },
  emojiButtonSelected: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  emojiText: {
    fontSize: 28,
  },
  input: {
    fontSize: 16,
    backgroundColor: Colors.white,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: Colors.text,
    minHeight: 48,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  recurrenceButtons: {
    gap: 8,
  },
  recurrenceButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  recurrenceButtonActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  recurrenceText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    textAlign: 'center',
  },
  recurrenceTextActive: {
    color: Colors.primary,
  },
  buttons: {
    gap: 10,
    marginTop: 16,
  },
});
