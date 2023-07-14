import { Component, OnDestroy, OnInit } from '@angular/core';
import { Nft } from '../../models/nft';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TransferService } from 'src/app/core/services/transfer.service';
import { ModalModel } from 'src/app/core/models/modal.model';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
})
export class ApproveComponent implements OnInit, OnDestroy {
  modalData: ModalModel = {
    title: 'Cannot access to PaySafe',
    description: 'invalid username or password.',
    buttonOk: true,
    buttonClose: false,
    buttonOkName: 'OK',
    buttonCloseName: 'Close',
    status: false,
  };
  showToastSuccess = false;
  listSub: any = null;
  approveSub: any = null;
  listTransaction: any = [];
  constructor(private _transactionService: TransactionService, private _transferService: TransferService) {

  }
  closeToast(){
    this.showToastSuccess = false;
  }
  approveRoot(transactionId: number) {
      this.showToastSuccess = true;
      this.approveSub =this._transferService.approve({transactionId: transactionId}).pipe(
        tap((response: any) => {
          if (response.status === 200) {
            this.showToastSuccess = true;
            this.listLoad();
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
  ngOnDestroy(): void {
     if (this.listSub) {
      this.listSub.unsubscribe();
     }
     if (this.approveSub) {
      this.approveSub.unsubscribe();
     }
  }
  listLoad(){
    this.listSub = this._transactionService.list(0,10 ).pipe(
      tap((response: any) => {
        if (response.status === 200) {
          this.listTransaction = response.data.content;
        }
      }),
      catchError((error: any) => {
        console.log(error);
        return of(error).pipe(tap(console.error));
      }),
    )
    .subscribe();
  }
  ngOnInit(): void {
    this.showToastSuccess = false;
    this.listLoad();
  }
}
