import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { of } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})



export class SignInComponent  implements OnInit, OnDestroy {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  _subscription: any;
  showToastSuccess = false;
  iconToastStatus = "success"
  toastTitle = "";

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private _authService: AuthService,
    private _storageService: StorageService,
    public _toastService: ToastService
  ) {

  }

  ngOnInit(): void {
    this.showToastSuccess = false;
    this.form = this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }
  // toastSuccess(message: string){
  //   this.showToastSuccess = true;
  //   this.toastTitle = message
  //   this.iconToastStatus = "success"
  // }
  // toastError(message: string){
  //   this.showToastSuccess = true;
  //   this.toastTitle = message
  //   this.iconToastStatus = "danger"
  // }
  onSubmit() {
    this._toastService.toastClose();
    this.submitted = true;
    const { username, password } = this.form.value;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    } else {
      this._subscription = this._authService
        .login(username, password)
        .pipe(
          tap((response: any) => {
            if (response.status === 200) {
              this._toastService.toastSuccess("Login success")
              this._storageService.saveUser(response.data);
              this._router.navigate(['/dashboard/main']);
            }
          }),
          catchError((error: any) => {
            this._toastService.toastError(error.error.data.join('</br>'));
            return of(error).pipe(tap(console.error));
          }),
        )
        .subscribe();
    }
  }
  ngOnDestroy() {
    if (this._subscription){
      this._subscription.unsubscribe();
    }

  }
}
