import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector} from 'react-redux';

const HomeScreen = () => {
  const theme = useSelector(state => state.theme.theme);
  return (
    <>
      <View
        style={[
          HomeScreenStyles.container,
          {backgroundColor: theme.colors.background},
        ]}>
        <Text>Home Screen</Text>
      </View>
    </>
  );
};

const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingTop: 20,
  },
});

export default HomeScreen;
