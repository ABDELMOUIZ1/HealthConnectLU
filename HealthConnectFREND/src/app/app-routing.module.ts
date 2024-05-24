// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorSearchComponent } from './doctor-search/doctor-search.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {ProfileComponent} from "./profile/profile.component";
import {AppointmentComponent} from "./appointment/appointment.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'search', component: DoctorSearchComponent},
  { path: 'register', component: RegistrationComponent },
  { path: '', component: DoctorSearchComponent },
  { path: 'doctor-list', component: DoctorListComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'take', component: AppointmentComponent },
  { path: 'appointment', component: AppointmentComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
