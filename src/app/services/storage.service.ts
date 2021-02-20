import { Injectable } from '@angular/core';
import { Configs } from '../config/config';
import { User } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getUserData(): string {
    return JSON.parse(localStorage.getItem(Configs.USER_TOKEN)); 
  }

  setUserData(data: User) {
    localStorage.removeItem(Configs.USER_TOKEN);
    localStorage.setItem(Configs.USER_TOKEN, JSON.stringify(data));
  }
}
