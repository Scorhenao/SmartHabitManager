import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import ThemeToggle from '../components/ThemeToggle';
import CustomInput from '../components/CustomInput';

const LoginScreen = () => {
  const theme = useSelector(state => state.theme.theme);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
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
        <View style={styles.themeToggle}>
          <ThemeToggle />
        </View>

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
          <Text style={{color: theme.colors.texts}}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: theme.colors.buttons.primary}]}
          onPress={handleLogin}>
          <Text style={{color: theme.colors.texts}}>Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  themeToggle: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 999,
  },
});

export default LoginScreen;
