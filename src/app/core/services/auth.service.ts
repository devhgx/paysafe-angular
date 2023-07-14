import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { JwtService } from './jwt.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly _apiUrl = environment.apiUrl + 'auth';

  constructor(private _http: HttpClient, private _storageService: StorageService, private _jwtService: JwtService) { }

  login(username: string, password: string): Observable<any> {
    const url: string = this._apiUrl + '/login';
    const body = { username, password };

    return this._http
      .post(url, body, httpOptions)
  }
  refreshToken(refreshToken:string): Observable<any>{
    const url: string = this._apiUrl + '/refreshToken';
    const body = { refreshToken };
    return this._http
    .post(url, body, httpOptions)
  }
  isAccessTokenExpired() {
    console.log('isAccessTokenExpired')
    const user = this._storageService.getUser();

    if (!user || !user?.accessToken || user?.accessToken === '') {
      return true;
    }

    const jwt = this._jwtService.decode(user.accessToken);
    const currentTimestamp = new Date().getTime();

    return jwt && jwt.exp && jwt.exp * 1000 < currentTimestamp;
  }
  logout(): Observable<any> {
    const url: string = this._apiUrl + '/logout';
    return this._http
      .get(url,  httpOptions)
  }
}
