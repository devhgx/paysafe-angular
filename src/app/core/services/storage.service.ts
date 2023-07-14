import { Injectable } from '@angular/core';
import { AuthModel } from '../models/auth.model';

const USER_KEY = 'auth-user';
const USER_PROFILE_KEY = 'user-profile';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): boolean {
    window.localStorage.removeItem(USER_KEY)
    window.localStorage.removeItem(USER_PROFILE_KEY)
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
  public getUserProfile() {
    const userProfile = window.localStorage.getItem(USER_PROFILE_KEY);
    if (userProfile) {
      return JSON.parse(userProfile);
    }

    return null;
  }
  public saveUserProfile(userProfile: any): AuthModel | null {
    window.localStorage.removeItem(USER_PROFILE_KEY);
    window.localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(userProfile));
    return this.getUser()
  }

  public isLoggedIn(): boolean {
    return  window.localStorage.getItem(USER_KEY) !== null;
  }
}
