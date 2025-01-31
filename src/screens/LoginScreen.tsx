import React, {useState, useEffect} from 'react';
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
  Switch,
} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import CustomInput from '../components/CustomInput';
import {useUser} from '../hooks/useUser';
import NavBar from '../components/NavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const theme = useSelector(state => state.theme.theme);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  const {loginUser} = useUser();

  useEffect(() => {
    const loadSavedPassword = async () => {
      const savedEmail = await AsyncStorage.getItem('email');
      const savedPassword = await AsyncStorage.getItem('password');
      if (savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
        setRememberPassword(true);
      }
    };
    loadSavedPassword();
  }, []);

  const handleLogin = async () => {
    try {
      if (rememberPassword) {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
      } else {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
      }

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

          <View style={styles.passwordContainer}>
            <CustomInput
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'eye' : 'eye-off'}
                size={20}
                color={theme.colors.texts}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rememberContainer}>
            <Switch
              value={rememberPassword}
              onValueChange={setRememberPassword}
              trackColor={{
                false: theme.colors.buttons.tertiary,
                true: theme.colors.primary,
              }}
              thumbColor={rememberPassword ? theme.colors.primary : '#f4f3f4'}
            />
            <Text style={{color: theme.colors.texts}}>Remember password</Text>
          </View>

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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
