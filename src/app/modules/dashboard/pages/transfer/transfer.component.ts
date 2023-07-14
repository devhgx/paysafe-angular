import { Component, OnDestroy, OnInit } from '@angular/core';
import { Nft } from '../../models/nft';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, catchError, of } from 'rxjs';
import { ModalModel } from 'src/app/core/models/modal.model';
import { StorageService } from 'src/app/core/services/storage.service';
import { TransferService } from 'src/app/core/services/transfer.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent implements OnInit, OnDestroy {
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
  userProfile: any = {

  }
  constructor(
    private readonly _formBuilder: FormBuilder,
    // private readonly _router: Router,
    // private _userService: UsersService,
    private _transferService: TransferService,
    private _storageService: StorageService,
    public _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.showToastSuccess = false;
    this.userProfile = this._storageService.getUserProfile();
    console.log( this.userProfile )
    this.form = this._formBuilder.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      recipientUserName: ['', [Validators.required]],
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
      note,
      amount,
      recipientUserName
    } = this.form.value;

    if (this.form.invalid) {
      return;
    } else{
      this._subscription = this._transferService
        .transferToUsername(
          {
            "recipientUserName":recipientUserName,
            "note": note,
            "amount": amount
          })
        .pipe(
          tap((response: any) => {
            if (response.status === 200) {
              this.form.reset();
              Object.values(this.form.controls).forEach((control) => control.setErrors(null));
              this._toastService.toastSuccess("Transfer Success");
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
