import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Nft } from '../../../../../dashboard/models/nft';

@Component({
  selector: '[admin-table]',
  templateUrl: './admin-table.component.html',
})
export class AdminTableComponent implements OnInit {
  @Input() public listTransaction: any;
  @Output() approveChildFirst = new EventEmitter()

  transactionType: any = {
    "T": "Transaction",
    "W": "Withdraw",
    "D": "Deposit",
  }
  transactionProcessStatus: any = {
    1: "Wait Recipient Approve",
    2: "Wait Admin Approve",
    3: "Success",
  }
  // public activeAuction: [] = [];

  // constructor() {}

  ngOnInit(): void {
    console.log(this.listTransaction);
  }

  approve(transactionId: number) {
      this.approveChildFirst.emit(transactionId)
  }

}
