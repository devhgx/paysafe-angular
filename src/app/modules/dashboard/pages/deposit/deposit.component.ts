import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ModalModel } from 'src/app/core/models/modal.model';
import { TransferService } from 'src/app/core/services/transfer.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit, OnDestroy {
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
    private _transferService: TransferService,
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      bankId: ['', [Validators.required]],
      bankAccountName: ['', [Validators.required], Validators.minLength(3)],
      bankAccountNumber: ['', [Validators.required, Validators.minLength(6)]],
      note: ['', [Validators.required ]],
    });
  }

  get f() {
    return this.form.controls;
  }


  onSubmit() {
    this.modalData.status = false;
    this.submitted = true;
    const {
      amount,
      bankId,
      bankAccountName,
      bankAccountNumber,
      note
    } = this.form.value;

    if (this.form.invalid) {
      return;
    } else{
      this._subscription = this._transferService
        .deposit(
          {
            "depositFromBankId": bankId,
            "depositFromAccountBankNumber": bankAccountNumber,
            "depositFromAccountName": bankAccountName,
            "note": note,
            "amount": amount
          })
        .pipe(
          tap((response: any) => {
            if (response.status === 200) {
              this.form.reset();
              Object.values(this.form.controls).forEach((control) => control.setErrors(null));
              this.modalData = {
                title: 'Success',
                description: 'You deposit ready!!',
                buttonOk: true,
                buttonClose: false,
                buttonOkName: 'OK',
                buttonCloseName: 'Close',
                status: true,
              };
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
