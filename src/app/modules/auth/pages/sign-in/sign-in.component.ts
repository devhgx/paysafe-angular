import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { of } from 'rxjs';
import { ModalModel } from 'src/app/core/models/modal.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  modalData: ModalModel = {
    title: 'Cannot access to PaySafe',
    description: 'invalid username or password.',
    buttonOk: true,
    buttonClose: false,
    buttonOkName: 'OK',
    buttonCloseName: 'Close',
    status: false,
  };
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  _subscription: any;
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private _authService: AuthService,
    private _storageService: StorageService,
  ) {}

  ngOnInit(): void {
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

  onSubmit() {
    this.modalData.status = false;
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
              this._router.navigate(['/dashboard/main']);
              this._storageService.saveUser(response.data);
            } else {
            }
          }),
          catchError((error: any) => {
            console.log(error)
            this.modalData.status = true;
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
