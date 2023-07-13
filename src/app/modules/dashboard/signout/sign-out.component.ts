import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
})
export class SignOutComponent implements OnInit {


  constructor(private _storageService: StorageService,    private readonly _router: Router) {

  }

  ngOnInit(): void {
    this._storageService.clean();
    this._router.navigate(['/auth/sign-in'])
  }
}
