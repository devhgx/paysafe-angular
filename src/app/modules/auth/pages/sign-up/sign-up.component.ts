import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { StorageService } from 'src/app/core/services/storage.service';
import { of } from 'rxjs';
import { ModalModel } from 'src/app/core/models/modal.model';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
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
  passwordConfirmTextType!: boolean;
  _subscription: any;
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private _userService: UsersService,
    private _storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      fname: ['', [Validators.required, Validators.minLength(6)]],
      lname: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.minLength(6)]],
      bankId: ['', [Validators.required]],
      bankAccountName: ['', [Validators.required], Validators.minLength(6)],
      bankAccountNumber: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerm: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }
  toggleConfirmPasswordTextType() {
    this.passwordConfirmTextType = !this.passwordConfirmTextType;
  }

  onSubmit() {
    this.modalData.status = false;
    this.submitted = true;
    const { fname, lname, username, confirmPassword, phone, bankId, bankAccountName, bankAccountNumber, acceptTerm } =
      this.form.value;
    // stop here if form is invalid
    console.log(this.form.controls)
    if (this.form.invalid) {
      return;
    } else {
      this._subscription = this._userService
        .register({ fname, lname, username, confirmPassword, phone, bankId, bankAccountName, bankAccountNumber, acceptTerm })
        .pipe(
          tap((response: any) => {
            if (response.status === 200) {
            }
          }),
          catchError((error: any) => {
            console.log(error);
            this.modalData.status = true;
            return of(error).pipe(tap(console.error));
          }),
        )
        .subscribe();
    }
  }
  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
