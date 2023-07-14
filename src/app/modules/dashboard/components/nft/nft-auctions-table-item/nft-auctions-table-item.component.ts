import { Component, Input, OnInit } from '@angular/core';
import { Nft } from '../../../models/nft';

@Component({
  selector: '[nft-auctions-table-item]',
  templateUrl: './nft-auctions-table-item.component.html',
})
export class NftAuctionsTableItemComponent implements OnInit {
  @Input() auction: any;
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
  constructor() {}

  ngOnInit(): void {
    console.log(this.auction)
  }
}
