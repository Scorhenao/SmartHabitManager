import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Modal,
} from 'react-native';
import {useSelector} from 'react-redux';
import NavBar from '../components/NavBar';
import CreateHabitModal from '../components/CreateHabitModal';
import {useHabit} from '../hooks/useHabit';
import CalendarComponent from '../components/Calendar';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const theme = useSelector(state => state.theme.theme);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);

  const {habits, error} = useHabit();

  const formatDate = (date: string) => {
    return moment(date).format('D MMMM'); // Format date to show like "9 January"
  };

  const getFrequencyLabel = (createdAt: string) => {
    const now = moment();
    const created = moment(createdAt);
    const daysDiff = now.diff(created, 'days');

    if (daysDiff <= 1) {
      return 'Daily';
    }
    if (daysDiff <= 7) {
      return 'Weekly';
    }
    if (daysDiff <= 30) {
      return 'Monthly';
    }
    return 'Custom';
  };

  const handleCalendarPress = habit => {
    setSelectedHabit(habit);
    setCalendarVisible(true);
  };

  const handleCloseCalendar = () => {
    setCalendarVisible(false);
    setSelectedHabit(null);
  };

  return (
    <>
      <NavBar
        dropdownVisible={dropdownVisible}
        setDropdownVisible={setDropdownVisible}
      />
      <View
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        {error ? (
          <Text style={{color: theme.colors.buttons.tertiary}}>{error}</Text>
        ) : (
          <FlatList
            data={habits}
            renderItem={({item}) => (
              <View style={[styles.habitContainer]}>
                <View style={styles.habitItem}>
                  <View style={styles.dateContainer}>
                    <Text
                      style={[styles.dateText, {color: theme.colors.texts}]}>
                      {formatDate(item.createdAt)}
                    </Text>
                    <Text style={{color: theme.colors.texts}}>{item.name}</Text>
                    <Text style={{color: theme.colors.texts}}>
                      {item.description}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardContainer}>
                  <View style={styles.cardSubContainer}>
                    <Text style={{color: theme.colors.texts}}>
                      Frequency: {getFrequencyLabel(item.createdAt)}
                    </Text>
                    <Text style={{color: theme.colors.texts}}>
                      {item.reminderTime}
                    </Text>
                    <TouchableOpacity onPress={() => handleCalendarPress(item)}>
                      <Icon
                        name="calendar"
                        size={24}
                        color={theme.colors.texts}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        )}

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View
            style={[
              styles.floatBtn,
              {backgroundColor: theme.colors.buttons.primary},
              {right: width * 0.05},
            ]}>
            <Text style={[styles.plusSign, {color: theme.colors.background}]}>
              +
            </Text>
          </View>
        </TouchableOpacity>

        <CreateHabitModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />

        <Modal
          visible={calendarVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={handleCloseCalendar}>
          <View style={styles.overlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseCalendar}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <CalendarComponent />
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    marginTop: '16.3%',
    zIndex: -999,
  },
  floatBtn: {
    position: 'absolute',
    bottom: height * 0.05,
    zIndex: 200,
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.075,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusSign: {
    fontSize: width * 0.08,
  },
  habitContainer: {
    display: 'flex',
    alignSelf: 'center',
    width: width * 0.9,
    marginBottom: 10,
    borderRadius: 5,
    paddingBottom: 10,
    zIndex: -999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  habitItem: {
    flexDirection: 'column',
    padding: 20,
    borderRadius: 5,
    width: width * 0.9,
    marginBottom: 10,
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    alignContent: 'center',
    gap: 5,
    borderRadius: 5,
  },
  cardSubContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.6,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width * 0.9,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default HomeScreen;
