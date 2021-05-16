import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoggingInterceptor } from './logging.interceptor';
import {UnauthorizedActiveGuard} from './unauthorized-active.guard';
import { AdminPortalGuardGuard } from './admin-portal-guard.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { TestComponent } from './test/test.component';
import { AuthorizedActiveGuard } from './authorized-active.guard';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { AddTestComponent } from './add-test/add-test.component';
import { StartTestComponent } from './start-test/start-test.component';
import { EndTestComponent } from './end-test/end-test.component';
import { ResultsComponent } from './results/results.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    InstructionsComponent,
    TestComponent,
    AdminLoginComponent,
    AdminPortalComponent,
    AddTestComponent,
    StartTestComponent,
    EndTestComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:LoggingInterceptor,multi:true},AdminPortalGuardGuard,UnauthorizedActiveGuard,AuthorizedActiveGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
