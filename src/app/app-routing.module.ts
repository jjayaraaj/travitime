import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterationComponent } from './auth/registeration/registeration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGaurd } from './auth/auth.gaurd';
import { NewTourComponent } from './new-tour/new-tour.component';
import { AllToursComponent } from './dashboard/all-tours/all-tours.component';
import { MessagesComponent } from './dashboard/messages/messages.component';


const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGaurd]},
  {path: 'auth', component: AuthComponent},
  {path: 'auth/registration', component: RegisterationComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGaurd]},
  {path: 'dashboard/new-tour', component: NewTourComponent, canActivate: [AuthGaurd]},
  {path: 'dashboard/all-tours', component: AllToursComponent, canActivate: [AuthGaurd]},
  {path: 'dashboard/messages', component: MessagesComponent, canActivate: [AuthGaurd]},
  {path: 'dashboard/edit-tour/:id', component: NewTourComponent, canActivate: [AuthGaurd]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
