import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { ModalModel } from 'src/app/core/models/modal.model';
import { TransferService } from 'src/app/core/services/transfer.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
})
export class WithdrawComponent implements OnInit, OnDestroy {
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
    this.userProfile = this._storageService.getUserProfile();
    this.form = this._formBuilder.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      userBankId: ['', [Validators.required]],
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
      userBankId
    } = this.form.value;
    if (this.form.invalid) {
      return;
    } else{
      this._subscription = this._transferService
        .withdraw(
          {
            "userBankId":userBankId *1,
            "note": note,
            "amount": amount *1
          })
        .pipe(
          tap((response: any) => {
            if (response.status === 200) {
              this.form.reset();
              this.submitted = false;
              this._toastService.toastSuccess("Withdraw Success")
            }
          }),
          catchError((error: any) => {
            try{
              this._toastService.toastError(error.error.data.join('</br>'));
            } catch(e) {
              this._toastService.toastError("Something wrong check your connection.");
            }
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
