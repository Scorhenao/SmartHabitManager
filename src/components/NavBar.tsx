import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import ThemeToggle from './ThemeToggle';

const NavBar = ({dropdownVisible, setDropdownVisible}) => {
  const theme = useSelector(state => state.theme.theme);
  const navigation = useNavigation();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleNavigation = (screen: string) => {
    setDropdownVisible(false);
    navigation.navigate(screen);
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.navbar}]}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.menuButton}>
        <Icon name="menu" size={24} color={theme.colors.background} />
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={[styles.dropdown, {backgroundColor: theme.colors.navbar}]}>
          <TouchableOpacity
            onPress={() => handleNavigation('Login')}
            style={styles.dropdownItem}>
            <Text style={{color: theme.colors.background}}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNavigation('Register')}
            style={styles.dropdownItem}>
            <Text style={{color: theme.colors.background}}>Register</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.themeToggle}>
        <ThemeToggle />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2,
  },
  menuButton: {
    padding: 10,
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 10,
    width: 120,
    borderRadius: 8,
    padding: 10,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownItem: {
    paddingVertical: 8,
  },
  themeToggle: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 999,
  },
});

export default NavBar;
