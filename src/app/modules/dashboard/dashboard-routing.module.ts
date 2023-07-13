import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { DepositComponent } from './pages/deposit/deposit.component';
import { WithdrawComponent } from './pages/withdraw/withdraw.component';
import { ApproveComponent } from './pages/approve/approve.component';
import { TransferComponent } from './pages/transfer/transfer.component';
import { SignOutComponent } from './signout/sign-out.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: NftComponent , canActivate: [AuthGuard]},
      { path: 'deposit', component: DepositComponent , canActivate: [AuthGuard]},
      { path: 'withdraw', component: WithdrawComponent , canActivate: [AuthGuard]},
      { path: 'approve', component: ApproveComponent , canActivate: [AuthGuard]},
      { path: 'transfer', component: TransferComponent  , canActivate: [AuthGuard]},
      { path: 'sign-out', component: SignOutComponent  , canActivate: [AuthGuard]},
      { path: '**', redirectTo: 'error/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
