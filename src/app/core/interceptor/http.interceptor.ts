import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService, private _storageService: StorageService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      request = request.clone({
        withCredentials: true,
      });

    // Check if access token is expired
    if (request.responseType == 'json' && !request.url.endsWith('/api/auth/refreshToken') && this._authService.isAccessTokenExpired()) {
      const user = this._storageService.getUser();
      if (user === null) {
        return next.handle(request).pipe(
          catchError((error) => {
            console.error(error)
            // Handle request error
            return throwError(error);
          }),
        );
      }
      return this._authService.refreshToken(user.refreshToken).pipe(
        switchMap((response: any) => {
          this._storageService.saveUser({...user, accessToken:  response.data.refreshToken});
          // Clone the original request and add the updated access token
          const newRequest = request.clone({
            withCredentials: true,
            setHeaders: {
              Authorization: `Bearer ${response.data.accessToken}`,
              RefreshToken: response.data.refreshToken
            },
          });
          // Continue the request with the updated token
          return next.handle(newRequest).pipe(
            catchError((error) => {
              console.error(error)
              // Handle request error
              return throwError(error);
            }),
          );
        }),
        catchError((error) => {
          console.error(error)
          // Handle token refresh error
          // For example, redirect to login page or show an error message
          return throwError(error);
        }),
      );
    }

    // Access token is not expired, proceed with the original request
    return next.handle(request).pipe(
      catchError((error) => {
        console.error(error)
        // Handle request error
        return throwError(error);
      }),
    );
  }
}
