// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DoctorSearchComponent } from './doctor-search/doctor-search.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { AppRoutingModule } from './app-routing.module';
import { SpecializationsComponent } from './specializations/specializations.component';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {ProfileComponent} from "./profile/profile.component";
import { AppointmentComponent } from './appointment/appointment.component';
import {CookieService} from "ngx-cookie-service";

@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent,
    AppComponent,
    DoctorSearchComponent,
    DoctorListComponent,
    SpecializationsComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    AppointmentComponent,
    AppComponent,
    AppointmentComponent


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
