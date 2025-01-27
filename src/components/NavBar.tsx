import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const NavBar = () => {
  return (
    <>
      <View style={NavBarStyles.container}>
        <Text>NavBar</Text>
      </View>
    </>
  );
};

const NavBarStyles = StyleSheet.create({
  container: {},
});

export default NavBar;
