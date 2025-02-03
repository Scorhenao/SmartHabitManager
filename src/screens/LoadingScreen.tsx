import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const LoadingScreen = () => {
  const bounceValue = useRef(new Animated.Value(0)).current;

  const shadowOpacity = bounceValue.interpolate({
    inputRange: [-40, 0],
    outputRange: [0.3, 0],
  });

  useEffect(() => {
    const bounce = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -40,
          duration: 400,
          useNativeDriver: true,
        }),

        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    );

    bounce.start();

    return () => bounce.stop();
  }, [bounceValue]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.iconContainer,
          {
            transform: [{translateY: bounceValue}],
            shadowOpacity: shadowOpacity,
          },
        ]}>
        <Icon name="dribbble" size={60} color="#0000ff" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
});

export default LoadingScreen;
