import {UserRegisterRequest} from '../request/UserRegisterRequest';
import {UserRegisterResponse} from '../response/UserRegisterResponse';

export interface UserRepository {
  registerUser(data: UserRegisterRequest): Promise<UserRegisterResponse>;
}
