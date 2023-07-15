import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem, SubMenuItem } from 'src/app/core/models/menu.model';
import { MenuService } from '../../../services/menu.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuComponent implements OnInit {
  public pagesMenu$: Observable<MenuItem[]> = new Observable<MenuItem[]>();
  public showSideBar$: Observable<boolean> = new Observable<boolean>();
  public role:string = "NO";

  constructor(private menuService: MenuService, private _storageService: StorageService, private _jwtService:JwtService) {
    this.showSideBar$ = this.menuService.showSideBar$;
    this.pagesMenu$ = this.menuService.pagesMenu$;
    const user  = this._jwtService.decode(this._storageService.getUser().accessToken);
    this.role = user.role
  }

  public toggleMenu(subMenu: SubMenuItem) {
    this.menuService.toggleMenu(subMenu);
  }

  ngOnInit(): void {}
}
