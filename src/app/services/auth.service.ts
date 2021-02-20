import { Injectable } from '@angular/core';
import { LoginForm, SuccessLoginResponse, User } from '../models/types';
import { USER_AUTH_MOCK } from '../utils/USER_AUTH_MOCK';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async logIn(data: LoginForm): Promise< SuccessLoginResponse > {
    let response: SuccessLoginResponse;
    const resultUser: User[] = USER_AUTH_MOCK.filter(item => {
      if (data.email === item.email && data.password === item.password) {
        return item;
      }
    })
    if (resultUser.length === 1) {
      return response = {
        error: false,
        message: "User logged in successfully",
        data: resultUser[0]
      }
    } else {
      return response = {
        error: true,
        message: "Incorrect email or password",
        data: null
      }
    }
  }
}
