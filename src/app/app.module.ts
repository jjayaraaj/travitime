import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import  { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

import { RegisterationComponent } from './auth/registeration/registeration.component';
import {MatSelectModule} from '@angular/material/select';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HeaderComponent } from './common/header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterationComponent,
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    HttpClientModule

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
