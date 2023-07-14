import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
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
  passwordMatchValidate:boolean = false;
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private _userService: UsersService,
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      fname: ['', [Validators.required, Validators.minLength(6)]],
      lname: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      bankId: ['', [Validators.required]],
      bankAccountName: ['', [Validators.required], Validators.minLength(3)],
      bankAccountNumber: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerm: ['', [Validators.required ]],
      email: ['', [Validators.required, Validators.minLength(6), Validators.email]],
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
    const {
      fname,
      lname,
      username,
      confirmPassword,
      email,
      password,
      phone,
      bankId,
      bankAccountName,
      bankAccountNumber,
      acceptTerm,
    } = this.form.value;
    // stop here if form is invalid
    this.passwordMatchValidate = false;
    if (password !== confirmPassword){
      this.passwordMatchValidate = true
 }
    if (this.form.invalid) {
      return;
    } else{
      this._subscription = this._userService

        .register({
          firstName: fname,
          lastName: lname,
          username: username,
          email: email,
          phoneNumber: phone,
          password: password,
          bankId: bankId,
          accountBankName: bankAccountName,
          accountBankNumber: bankAccountNumber,
          acceptTerm,
        })
        .pipe(
          tap((response: any) => {
            if (response.status === 200) {
              this.form.reset();
              Object.values(this.form.controls).forEach((control) => control.setErrors(null));
              this.modalData = {
                title: 'Success',
                description: 'You register ready!!',
                buttonOk: true,
                buttonClose: false,
                buttonOkName: 'OK',
                buttonCloseName: 'Close',
                status: true,
              };
              this._router.navigate(['/auth/sign-in'])
            }
          }),
          catchError((error: any) => {
            console.log(error);
            this.modalData = {
              title: 'Warning',
              description: error.error.data.join('</br>'),
              buttonOk: true,
              buttonClose: false,
              buttonOkName: 'OK',
              buttonCloseName: 'Close',
              status: true,
            };
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
