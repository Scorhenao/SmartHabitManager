import React, {useState, useRef} from 'react';
import {View, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;

  const toggleTheme = () => {
    Animated.timing(rotation, {
      toValue: isDarkMode ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setIsDarkMode(!isDarkMode);
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
            size={50}
            color={isDarkMode ? '#FFD700' : '#4CAF92'}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});
