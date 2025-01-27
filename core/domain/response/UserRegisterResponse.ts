export interface UserRegisterResponse {
  status: number;
  data: {
    id: string;
    name: string;
    email: string;
    cellphone: string;
  };
  message: string;
}
