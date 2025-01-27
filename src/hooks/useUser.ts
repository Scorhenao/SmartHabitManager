import {useNavigation} from '@react-navigation/native';
import {UserRegisterRequest} from '../../core/domain/request/UserRegisterRequest';
import {userImplementation} from '../../core/infrastructure/implementations/UserImplementation';
import {UserLoginRequest} from '../../core/domain/request/UserLoginRequest';

export const useUser = () => {
  const navigation = useNavigation();
  const registerUser = async (data: UserRegisterRequest) => {
    try {
      const response = await userImplementation.registerUser(data);
      console.log('User registered successfully:', response.data);
      navigation.navigate('Login');
      return response;
    } catch (error: any) {
      console.error(
        'Error registering user:',
        error.response?.data || error.message,
      );
      throw error;
    }
  };

  const loginUser = async (data: UserLoginRequest) => {
    try {
      const response = await userImplementation.loginUser(data);
      console.log('User logged in successfully:', response.token);
      navigation.navigate('Home');
      return response;
    } catch (error: any) {
      console.error(
        'Error logging in user:',
        error.response?.data || error.message,
      );
      throw error;
    }
  };

  return {registerUser, loginUser};
};
