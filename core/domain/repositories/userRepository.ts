import {UserLoginRequest} from '../request/UserLoginRequest';
import {UserRegisterRequest} from '../request/UserRegisterRequest';
import {UserLoginResponse} from '../response/UserLoginResponse';
import {UserRegisterResponse} from '../response/UserRegisterResponse';

export interface UserRepository {
  registerUser(data: UserRegisterRequest): Promise<UserRegisterResponse>;
  loginUser(data: UserLoginRequest): Promise<UserLoginResponse>;
}
