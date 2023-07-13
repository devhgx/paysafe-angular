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
export class UserStatementService {
  readonly _apiUrl = environment.apiUrl + 'user-statements';

  constructor(private _http: HttpClient, private _storageService: StorageService, private _jwtService: JwtService) {}

  listActive(): Observable<any> {
    const url: string = this._apiUrl + `/listActive`;
    return this._http.get(url, httpOptions);
  }
  listAll(pageNumber: number, pageSize: number): Observable<any> {
    const url: string = this._apiUrl + `/listAll/${pageNumber}/${pageSize}`;
    return this._http.get(url, httpOptions);
  }
}
