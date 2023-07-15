import { Component, OnDestroy, OnInit } from '@angular/core';
import { Nft } from '../../models/nft';
import { UsersService } from 'src/app/core/services/users.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserStatementService } from 'src/app/core/services/userstatement.service';
import { TransactionService } from 'src/app/core/services/transaction.service';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
})
export class NftComponent implements OnInit, OnDestroy {
  nft: Array<Nft>;
  _userProfileSub: any = null;
  _userStatementActiveSub: any = null;
  _userTransactionAllSub: any = null;
  listTransaction = []
  public role:string = "" ;
  constructor(private _userService: UsersService, private _transactionService: TransactionService, private _storageService: StorageService, private _userStatementService:UserStatementService) {
    this.nft = [
      {
        id: 34356771,
        title: 'Balance',
        creator: '',
        instant_price: 4.2,
        price: 0.0,
        ending_in: '06h 52m 47s',
        last_bid: 0.0,
        image: './assets/images/img-01.jpg',
        avatar: './assets/avatars/avt-01.jpg',
      },
      {
        id: 34356772,
        title: 'Income',
        price:0.0,
        last_bid: 0.0,
        image: './assets/images/img-02.jpg',
      },
      {
        id: 34356773,
        title: 'Expense',
        price: 0.0,
        last_bid: 0.0,
        image: './assets/images/img-03.jpg',
      },
    ];
  }

  ngOnInit(): void {
    this._userProfileSub = this._userService
      .getProfile()
      .pipe(
        tap((response: any) => {
          if (response.status === 200) {
            this.role = response.data.role;
            this._storageService.saveUserProfile(response.data);
          }
        }),
        catchError((error: any) => {
          console.log(error);
          return of(error).pipe(tap(console.error));
        }),
      )
      .subscribe();
      this._userStatementActiveSub = this._userStatementService.listActive().pipe(
        tap((response: any) => {
          if (response.status === 200) {
            this.nft[0].last_bid = response.data.balance;
            this.nft[1].last_bid = response.data.income;
            this.nft[2].last_bid = response.data.expense;
          }
        }),
        catchError((error: any) => {
          console.log(error);
          return of(error).pipe(tap(console.error));
        }),
      )
      .subscribe();

      this._userTransactionAllSub =  this._transactionService.listAll(0,10 ).pipe(
        tap((response: any) => {
          if (response.status === 200) {
            this.listTransaction = response.data.content;
          }
        }),
        catchError((error: any) => {
          return of(error).pipe(tap(console.error));
        }),
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    if (this._userProfileSub) {
      this._userProfileSub.unsubscribe();
    }
    if (this._userStatementActiveSub) {
      this._userStatementActiveSub.unsubscribe();
    }
    if (this._userTransactionAllSub) {
      this._userTransactionAllSub.unsubscribe();
    }
  }
}
