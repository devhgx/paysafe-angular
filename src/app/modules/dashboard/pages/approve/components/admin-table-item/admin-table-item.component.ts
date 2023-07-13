import { Component, Input, OnInit } from '@angular/core';
import { Nft } from '../../../../../dashboard/models/nft';

@Component({
  selector: '[admin-table-item]',
  templateUrl: './admin-table-item.component.html',
})
export class AdminTableItemComponent implements OnInit {
  @Input() auction = <Nft>{};

  constructor() {}

  ngOnInit(): void {}
}
