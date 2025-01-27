import axios from 'axios';
import {UserRegisterRequest} from '../../domain/request/UserRegisterRequest';
import {UserRegisterResponse} from '../../domain/response/UserRegisterResponse';
import {UserRepository} from '../../domain/repositories/userRepository';
import {BASE_URL} from '@env';

export class UserController implements UserRepository {
  private readonly baseUrl = BASE_URL;

  async registerUser(data: UserRegisterRequest): Promise<UserRegisterResponse> {
    const response = await axios.post<UserRegisterResponse>(
      `${this.baseUrl}/users/register`,
      data,
    );
    return response.data;
  }
}
