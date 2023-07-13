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
export class TransferService {
  readonly _apiUrl = environment.apiUrl + 'transfer';

  constructor(private _http: HttpClient, private _storageService: StorageService, private _jwtService: JwtService) {}

  transferToUsername(data: any): Observable<any> {
    const url: string = this._apiUrl + '/toUsername';
    const body = data;

    return this._http.post(url, body, httpOptions);
  }

  deposit(data: any): Observable<any> {
    const url: string = this._apiUrl + '/deposit';
    const body = data;

    return this._http.post(url, body, httpOptions);
  }
  withdraw(data: any): Observable<any> {
    const url: string = this._apiUrl + '/withdraw';
    const body = data;

    return this._http.post(url, body, httpOptions);
  }
  approve(data: any): Observable<any> {
    const url: string = this._apiUrl + '/approve';
    const body = data;

    return this._http.post(url, body, httpOptions);
  }

  list(pageNumber: number, pageSize: number): Observable<any> {
    const url: string = this._apiUrl + `/list/${pageNumber}/${pageSize}`;
    return this._http.get(url, httpOptions);
  }
}
