export interface UserRegisterRequest {
  username: string;
  password: string;
  phoneNumber: string;
  address: string;
  email: string;
  age: number;
  userType: 'NORMAL' | 'TEST';
}
