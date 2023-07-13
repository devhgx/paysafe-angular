import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class BankService {
  readonly _apiUrl = environment.apiUrl + 'banks';

  constructor(private _http: HttpClient ) { }


  list(): Observable<any> {
    const url: string = this._apiUrl + '/list';
    return this._http
      .get(url, httpOptions)
  }
}
