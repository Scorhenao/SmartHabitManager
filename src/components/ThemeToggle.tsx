import React, {useRef} from 'react';
import {View, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {toggleDarkMode} from '../redux/reducers/themeSlice';

export default function ThemeToggle() {
  const rotation = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.theme.darkMode);

  const toggleTheme = () => {
    Animated.timing(rotation, {
      toValue: isDarkMode ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    dispatch(toggleDarkMode());
  };

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleTheme}>
        <Animated.View style={{transform: [{rotate: rotateInterpolation}]}}>
          <Icon
            name={isDarkMode ? 'sun' : 'moon'}
            size={30}
            color={isDarkMode ? '#FFD700' : '#4CAF92'}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
