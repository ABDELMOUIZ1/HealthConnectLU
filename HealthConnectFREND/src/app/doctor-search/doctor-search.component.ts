// src/app/doctor-search/doctor-search.component.ts
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';
import {DoctorSearchDTO, Patient} from "../app.model";
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-doctor-search',
  templateUrl: './doctor-search.component.html',
  styleUrls: ['./doctor-search.component.css']
})
export class DoctorSearchComponent {
  searchDTO: DoctorSearchDTO = {

  };

  constructor(private http: HttpClient ,private doctorService: DoctorService, private router: Router, private cookieService: CookieService) { }
  userName: string | undefined; // Variable to store the user's name

  onSearch(): void {
    this.doctorService.searchDoctors(this.searchDTO).subscribe(doctors => {
      // Store the search results in a service or navigate to the doctor list page
      // For simplicity, navigating to the doctor list page with the search results
      this.router.navigate(['/doctor-list'], { state: { doctors } });
    });
  }
  ngOnInit(): void {
    // Retrieve JWT token from cookies
    const jwtToken = this.cookieService.get('jwtToken');

    // Decode JWT token to extract user information
    const tokenPayload = this.decodeToken(jwtToken);
    if (tokenPayload) {
      // Extract user's name from the token payload
      this.userName = tokenPayload.firstName + ' ' + tokenPayload.lastName;

    }
  }

  decodeToken(token: string): any {
    try {
      // Split token into its parts
      const tokenParts = token.split('.');

      // Decode token payload (second part)
      const tokenPayload = JSON.parse(atob(tokenParts[1]));

      return tokenPayload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }




}
