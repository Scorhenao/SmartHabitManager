import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {useSelector} from 'react-redux';
import {AuthState} from '../redux/interfaces/authState';

export default function AppNavigator() {
  const token = useSelector((state: AuthState) => state.token);

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={token ? 'Home' : 'Register'}>
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Register"
          options={{headerShown: false}}
          component={RegisterScreen}
        />
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
