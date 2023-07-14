import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: '[admin-table-item]',
  templateUrl: './admin-table-item.component.html',
})
export class AdminTableItemComponent implements OnInit {
  @Input() auction: any = [];
  // @Output() approveChildSecond = new EventEmitter()
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
  approve(transactionId: number) {
      // this.approveChildSecond.emit(transactionId)
  }
  constructor() {}

  ngOnInit(): void {}

}

