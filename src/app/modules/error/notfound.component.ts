import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
})
export class NotfoundComponent   {


  constructor( private readonly _router: Router) {

  }
  backToHome(){
      this._router.navigate(['/auth/sign-in']);
  }

}
