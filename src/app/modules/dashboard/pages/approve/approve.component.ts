import { Component, OnDestroy, OnInit } from '@angular/core';
import { Nft } from '../../models/nft';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TransferService } from 'src/app/core/services/transfer.service';
import { ModalModel } from 'src/app/core/models/modal.model';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
})
export class ApproveComponent implements OnInit, OnDestroy {

  listSub: any = null;
  approveSub: any = null;
  listTransaction: any = [];
  constructor(private _transactionService: TransactionService, private _transferService: TransferService, public _toastService: ToastService) {

  }

  approveRoot(transactionId: number) {
      this.approveSub =this._transferService.approve({transactionId: transactionId}).pipe(
        tap((response: any) => {
          if (response.status === 200) {
            this._toastService.toastSuccess("Approve Success")
            this.listLoad();
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
  ngOnInit(): void {
    this.listLoad();
  }
}
