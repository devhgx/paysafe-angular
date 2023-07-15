import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnInit {
  public isMenuOpen = false;
  userProfile:any = {name:"", email:""};
  constructor(private _storageSerive: StorageService) {}

  ngOnInit(): void {

  }

  public toggleMenu(): void {
    this.userProfile = this._storageSerive.getUserProfile()
    this.isMenuOpen = !this.isMenuOpen;
  }
}
