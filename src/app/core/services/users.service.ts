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
export class UsersService {
  readonly _apiUrl = environment.apiUrl + 'user';

  constructor(private _http: HttpClient, private _storageService: StorageService, private _jwtService: JwtService) { }

  register(data:any): Observable<any> {
    const url: string = this._apiUrl + '/register';
    const body = data;

    return this._http
      .post(url, body, httpOptions)
  }

  getProfile(): Observable<any> {
    const url: string = this._apiUrl + '/getProfile';
    return this._http
      .get(url, httpOptions)
  }

  getUserBanks(data:any): Observable<any> {
    const url: string = this._apiUrl + '/getUserBanks';
    const body = data;

    return this._http
      .post(url, body, httpOptions)
  }

}
