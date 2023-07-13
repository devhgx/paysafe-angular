import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  public decode(accessToken: string) {
    if (accessToken) {
      return jwtDecode<JwtPayload>(accessToken);
    }
    return null;
  }
}
