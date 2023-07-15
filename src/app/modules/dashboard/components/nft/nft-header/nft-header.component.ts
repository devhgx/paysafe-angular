import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-nft-header',
  templateUrl: './nft-header.component.html',
})
export class NftHeaderComponent implements OnInit {
  constructor( private readonly _router: Router, private _storageService: StorageService) {

  }

  goto(route: string){
    this._router.navigate([route]);
  }
  ngOnInit(): void {

  }
}
