import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ModalModel } from 'src/app/core/models/modal.model';
import { ToastService } from 'src/app/core/services/toast.service';
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
  showToastSuccess = false;


  constructor(
    private readonly _formBuilder: FormBuilder,
    private _transferService: TransferService,
    public _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.showToastSuccess = false;
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
    this._toastService.toastClose();
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
              this._toastService.toastSuccess("Deposit Success")
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
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
