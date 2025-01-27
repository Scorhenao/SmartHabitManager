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
import Icon from 'react-native-vector-icons/Feather';
import ThemeToggle from '../components/ThemeToggle';
import CustomInput from '../components/CustomInput';
import {useUser} from '../hooks/useUser';

const RegisterScreen = () => {
  const theme = useSelector(state => state.theme.theme);

  const [name, setName] = useState('Juan Perez');
  const [email, setEmail] = useState('juan@example.com');
  const [cellphone, setCellphone] = useState('1234567890');
  const [password, setPassword] = useState('password1234');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Usar el hook useUser
  const {registerUser} = useUser();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Datos que enviarás en la solicitud de registro
    const data = {
      name,
      email,
      cellphone,
      password,
    };

    try {
      const response = await registerUser(data);
      alert(response.message); // Aquí puedes manejar la respuesta (ej. mostrar mensaje)
    } catch (error) {
      alert('Error registering user!');
    }
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
          style={[styles.btn, {backgroundColor: theme.colors.buttons.primary}]}
          onPress={handleRegister}>
          <Text style={{color: theme.colors.texts}}>Register</Text>
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
  themeToggle: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 999,
  },
});

export default RegisterScreen;
