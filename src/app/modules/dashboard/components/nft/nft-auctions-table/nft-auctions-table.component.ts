import { Component, Input, OnInit } from '@angular/core';
import { Nft } from '../../../models/nft';

@Component({
  selector: '[nft-auctions-table]',
  templateUrl: './nft-auctions-table.component.html',
})
export class NftAuctionsTableComponent implements OnInit {
  public activeAuction: Nft[] = [];
  @Input() public listTransaction:any
  constructor() {
   }

  ngOnInit(): void {

  }
}
