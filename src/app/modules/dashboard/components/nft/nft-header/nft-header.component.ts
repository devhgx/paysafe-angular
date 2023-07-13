import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nft-header',
  templateUrl: './nft-header.component.html',
})
export class NftHeaderComponent implements OnInit {
  constructor( private readonly _router: Router) {

  }

  goto(route: string){
    this._router.navigate([route]);
  }
  ngOnInit(): void {}
}
