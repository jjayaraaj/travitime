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
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';


import { RegisterationComponent } from './auth/registeration/registeration.component';
import {MatSelectModule} from '@angular/material/select';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HeaderComponent } from './common/header/header.component';
import { NewTourComponent } from './new-tour/new-tour.component';
import { TourComponent } from './new-tour/tour/tour.component';
import { GroupComponent } from './new-tour/group/group.component';
import { TravellerComponent } from './new-tour/traveller/traveller.component';
import { ItineraryComponent } from './new-tour/itinerary/itinerary.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AllToursComponent } from './dashboard/all-tours/all-tours.component';
import { MessagesComponent } from './dashboard/messages/messages.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ItineraryEditComponent } from './new-tour/itinerary/itinerary-edit.component';
import { TravellerEditComponent } from './new-tour/traveller/traveller-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterationComponent,
    DashboardComponent,
    HeaderComponent,
    NewTourComponent,
    TourComponent,
    GroupComponent,
    TravellerComponent,
    ItineraryComponent,
    AllToursComponent,
    MessagesComponent,
    ItineraryEditComponent,
    TravellerEditComponent
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
    MatRadioModule,
    MatListModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatCheckboxModule,
    HttpClientModule

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ItineraryEditComponent, TravellerEditComponent]
})
export class AppModule { }
