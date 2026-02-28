import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserRegisterRequest} from '../models/UserRegisterRequest';
import {UserLoginRequest} from '../models/UserLoginRequest';
import {UserLoginResponse} from '../models/UserLoginResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(body: UserRegisterRequest){
    return this.http.post(`${this.baseUrl}/auth/register`, body);
  }
  login(body: UserLoginRequest){
    return this.http.post<UserLoginResponse>(`${this.baseUrl}/auth/login`, body);
  }
}
