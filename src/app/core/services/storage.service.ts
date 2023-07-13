import { Injectable } from '@angular/core';
import { AuthModel } from '../models/auth.model';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): boolean {
    window.localStorage.removeItem(USER_KEY)
    return !this.isLoggedIn()
  }

  public saveUser(user: any): AuthModel | null {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    return this.getUser()
  }

  public getUser() {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public isLoggedIn(): boolean {
    return  window.localStorage.getItem(USER_KEY) !== null;
  }
}
