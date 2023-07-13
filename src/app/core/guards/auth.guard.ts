import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _storageService : StorageService, private readonly _router: Router) {}

  canActivate(): boolean {
    const isLoggedIn: boolean = this._storageService.isLoggedIn();
    if (!isLoggedIn) {
       this._router.navigate(['/auth/sign-in'])
    }
    return isLoggedIn;
  }

}
