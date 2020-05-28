import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterationComponent } from './auth/registeration/registeration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGaurd } from './auth/auth.gaurd';


const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGaurd]},
  {path: 'auth', component: AuthComponent},
  {path: 'auth/registration', component: RegisterationComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGaurd]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
