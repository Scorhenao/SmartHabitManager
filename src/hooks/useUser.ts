import {useNavigation} from '@react-navigation/native';
import {UserRegisterRequest} from '../../core/domain/request/UserRegisterRequest';
import {userImplementation} from '../../core/infrastructure/implementations/UserImplementation';

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

  return {registerUser};
};
