/* eslint-disable react/react-in-jsx-scope */
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
export default function AppNavigator() {
  const stack = createStackNavigator();
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Register">
        <stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={LoginScreen}
        />
        <stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={HomeScreen}
        />
        <stack.Screen
          name="Register"
          options={{headerShown: false}}
          component={RegisterScreen}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}
