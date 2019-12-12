import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { BalanceComponent } from './balance/balance.component';
import { HistoryComponent } from './history/history.component';
import { SelfTransferComponent } from './self-transfer/self-transfer.component';
import { TransferComponent } from './transfer/transfer.component';
import { LogoutComponent } from './logout/logout.component';
import { ConvertPipe } from './convert.pipe';
import { SignupComponent } from './signup/signup.component';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BalanceComponent,
    HistoryComponent,
    SelfTransferComponent,
    TransferComponent,
    LogoutComponent,
    ConvertPipe,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
