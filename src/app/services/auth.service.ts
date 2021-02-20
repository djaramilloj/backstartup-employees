import { Injectable } from '@angular/core';
import { LoginRegisterForm, SuccessResponse } from '../models/types';
import { USERS_CREDENTIALS_AUTH } from '../utils/USER_AUTH_MOCK';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  registerUser(data: LoginRegisterForm): SuccessResponse {
    let response: SuccessResponse = {error: false, message: 'User registered successfully'};
    USERS_CREDENTIALS_AUTH.push(data);
    return response;
  }
}
