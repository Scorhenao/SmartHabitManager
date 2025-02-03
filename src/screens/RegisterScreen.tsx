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
import Icon from 'react-native-vector-icons/Feather';
import CustomInput from '../components/CustomInput';
import {useUser} from '../hooks/useUser';
import NavBar from '../components/NavBar';

const RegisterScreen = () => {
  const theme = useSelector(state => state.theme.theme);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {registerUser} = useUser();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match!');
      return;
    }

    const data = {
      name,
      email,
      cellphone,
      password,
    };

    try {
      const response = await registerUser(data);
      Alert.alert(response.message);
    } catch (error) {
      Alert.alert('Error registering user!');
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
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
          <CustomInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <CustomInput
            placeholder="Cellphone"
            value={cellphone}
            onChangeText={setCellphone}
            keyboardType="phone-pad"
          />
          <View style={styles.passwordContainer}>
            <CustomInput
              placeholder="Password"
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
          <View style={styles.passwordContainer}>
            <CustomInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              style={styles.passwordInput}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Icon
                name={showConfirmPassword ? 'eye' : 'eye-off'}
                size={20}
                color={theme.colors.texts}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.btn,
              {backgroundColor: theme.colors.buttons.primary},
            ]}
            onPress={handleRegister}>
            <Text style={{color: theme.colors.texts}}>Register</Text>
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
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  btn: {
    width: 150,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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

export default RegisterScreen;
