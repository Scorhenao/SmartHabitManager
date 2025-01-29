import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector} from 'react-redux';
import CustomInput from '../components/CustomInput';
import {useUser} from '../hooks/useUser';
import NavBar from '../components/NavBar';

const LoginScreen = () => {
  const theme = useSelector(state => state.theme.theme);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {loginUser} = useUser();

  const handleLogin = async () => {
    try {
      await loginUser({email, password});
    } catch (error: any) {
      Alert.alert('Error', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
      <KeyboardAvoidingView
        style={[styles.container, {backgroundColor: theme.colors.background}]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled">
          <View
            style={[
              styles.circle1,
              {backgroundColor: theme.colors.buttons.primary},
            ]}
          />

          <View
            style={[
              styles.circle2,
              {backgroundColor: theme.colors.buttons.secondary},
            ]}
          />
          <NavBar
            dropdownVisible={dropdownVisible}
            setDropdownVisible={setDropdownVisible}
          />

          <CustomInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <CustomInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={[styles.btnForgot]} onPress={handleLogin}>
            <Text style={{color: theme.colors.texts}}>
              Forgot your password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              {backgroundColor: theme.colors.buttons.primary},
            ]}
            onPress={handleLogin}>
            <Text style={{color: theme.colors.texts}}>Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
  btn: {
    width: 150,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnForgot: {
    marginTop: 0,
  },
  circle1: {
    position: 'absolute',
    top: -32,
    left: -40,
    width: 200,
    height: 210,
    borderRadius: 100,
  },
  circle2: {
    position: 'absolute',
    bottom: -32,
    right: -40,
    width: 200,
    height: 210,
    borderRadius: 100,
  },
});

export default LoginScreen;
