import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
export default function AppNavigator() {
  const stack = createStackNavigator();
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Login">
        <stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={LoginScreen}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}
