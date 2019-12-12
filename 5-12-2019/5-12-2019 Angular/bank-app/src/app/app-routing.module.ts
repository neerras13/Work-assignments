import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BalanceComponent } from './balance/balance.component';
import { SelfTransferComponent } from './self-transfer/self-transfer.component';
import { TransferComponent } from './transfer/transfer.component';
import { HistoryComponent } from './history/history.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path:'userHome',
    component: HomeComponent
  },
  {
    path:'balance',
    component: BalanceComponent
  },
  {
    path:'history',
    component: HistoryComponent
  },
  {
    path:'selfTransfer',
    component: SelfTransferComponent
  },
  {
    path:'transfer',
    component: TransferComponent
  },
  {
    path:'logout',
    component: LogoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
