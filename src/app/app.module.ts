import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './newclient/new.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { ClientService } from './_services/client.service';

import { AuthGuard } from './_guards/auth.guard';

import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NewComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    NgxMaskModule.forRoot()
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
