import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

const CalendarComponent = () => {
  const [selected, setSelected] = useState('');

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {selected: true, marked: true, selectedColor: 'blue'},
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CalendarComponent;
