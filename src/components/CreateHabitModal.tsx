import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import {useSelector} from 'react-redux';
import CustomInput from './CustomInput';
import Icon from 'react-native-vector-icons/Feather';
import {useHabit} from '../hooks/useHabit';
import {CreateHabitRequest} from '../../core/domain/request/CreateHabitRequest';

const CreateHabitModal = ({visible, onClose}) => {
  const theme = useSelector(state => state.theme.theme);
  const [habitName, setHabitName] = useState('');
  const [habitDescription, setHabitDescription] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>(
    'daily',
  );

  const {createHabit, error} = useHabit();

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  const handleCreateHabit = async () => {
    if (!habitName || !reminderTime) {
      Alert.alert('Please fill out all fields');
      return;
    }

    const habitData: CreateHabitRequest = {
      name: habitName,
      description: habitDescription,
      reminderTime,
      frequency,
    };

    try {
      await createHabit(habitData);
      Alert.alert('Habit created successfully!', habitName);
      onClose();
    } catch (err) {
      console.error('Error creating habit:', err);
      Alert.alert(
        'Failed to create habit',
        err.message || 'Please try again later',
      );
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View
          style={[
            styles.container,
            {backgroundColor: theme.colors.background},
          ]}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="x" size={24} color={theme.colors.texts} />
          </TouchableOpacity>

          <Text style={[styles.title, {color: theme.colors.texts}]}>
            Habit name:
          </Text>
          <CustomInput
            placeholder="e.g., Drink water"
            value={habitName}
            onChangeText={setHabitName}
          />

          <Text style={[styles.title, {color: theme.colors.texts}]}>
            Description:
          </Text>
          <CustomInput
            placeholder="Description of the habit"
            value={habitDescription}
            onChangeText={setHabitDescription}
          />

          <Text style={[styles.title, {color: theme.colors.texts}]}>
            Reminder time (HH:mm):
          </Text>
          <CustomInput
            placeholder="e.g., 08:00"
            value={reminderTime}
            onChangeText={setReminderTime}
          />

          <View style={styles.frequencyContainer}>
            {['daily', 'weekly', 'monthly'].map(freq => (
              <TouchableOpacity
                key={freq}
                style={[
                  styles.btn,
                  frequency === freq && {
                    backgroundColor: theme.colors.buttons.primary,
                  },
                ]}
                onPress={() =>
                  setFrequency(freq as 'daily' | 'weekly' | 'monthly')
                }>
                <Text style={{color: theme.colors.texts}}>{freq}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.createBtn,
              {backgroundColor: theme.colors.buttons.primary},
            ]}
            onPress={handleCreateHabit}>
            <Text style={{color: theme.colors.texts}}>Create Habit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  frequencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  btn: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  createBtn: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default CreateHabitModal;
