import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { MenuItem } from 'src/app/core/models/menu.model';
import { ThemeService } from 'src/app/core/services/theme.service';
import packageJson from '../../../../../../package.json';
import { MenuService } from '../../services/menu.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public showSideBar$: Observable<boolean> = new Observable<boolean>();
  public pagesMenu$: Observable<MenuItem[]> = new Observable<MenuItem[]>();
  public appJson: any = packageJson;
  _authSub: any = null;
  constructor(
    public themeService: ThemeService,
    private menuService: MenuService,
    private _authService: AuthService,
    private _storageService: StorageService,
    private readonly _router: Router,
  ) {
    this.showSideBar$ = this.menuService.showSideBar$;
    this.pagesMenu$ = this.menuService.pagesMenu$;
  }
  ngOnDestroy(): void {
    if (this._authSub) {
      this._authSub.unsubscribe();
    }
  }

  ngOnInit(): void {}

  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }

  toggleTheme() {
    this.themeService.theme = !this.themeService.isDark ? 'dark' : 'light';
  }
  clickSignOut() {
    this._authSub = this._authService
      .logout()
      .pipe(catchError((error: any) => {
          console.log(error);
          return of(error).pipe(tap(console.error));
        }),
      )
      .subscribe();
      this._storageService.clean();
      this._router.navigate(['/auth/sign-in']);
  }
}
