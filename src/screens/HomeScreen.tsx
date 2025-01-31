import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import NavBar from '../components/NavBar';
import {ScrollView} from 'react-native-gesture-handler';
import CreateHabitModal from '../components/CreateHabitModal';
import {useHabit} from '../hooks/useHabit';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const theme = useSelector(state => state.theme.theme);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const {habits, error} = useHabit();
  console.log('habits', habits);

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <NavBar
          dropdownVisible={dropdownVisible}
          setDropdownVisible={setDropdownVisible}
        />

        {error ? (
          <Text style={{color: theme.colors.buttons.tertiary}}>{error}</Text>
        ) : (
          <FlatList
            data={habits}
            renderItem={({item}) => (
              <View style={styles.habitItem}>
                <Text style={{color: theme.colors.text}}>{item.name}</Text>
                <Text style={{color: theme.colors.text}}>
                  {item.description}
                </Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </ScrollView>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  habitItem: {
    padding: 50,
    marginVertical: 65,
    backgroundColor: 'black',
    borderRadius: 5,
    width: width * 0.9,
    marginBottom: 10,
  },
});

export default HomeScreen;
