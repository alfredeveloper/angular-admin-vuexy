import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';

import { APP_ROUTES } from './app.routes';
import { AdminComponent } from './admin/admin.component';
import { AdminModule } from './admin/admin.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    APP_ROUTES,
    AdminModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
