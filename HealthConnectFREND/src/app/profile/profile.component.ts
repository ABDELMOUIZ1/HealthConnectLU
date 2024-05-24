import { Component, OnInit } from '@angular/core';
import { Doctor, Patient, Title, Specialization } from "../app.model";
import { PatientService } from "../patient.service";
import { DoctorService } from "../doctor.service";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any = {}; // Adjust type according to your needs
  isDoctor: boolean = false; // Flag to indicate if the user is a doctor
  titles = Object.values(Title); // Enum values for title selection
  specializations = Object.values(Specialization); // Enum values for specialization selection

  constructor(private patientService: PatientService, private doctorService: DoctorService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    const jwtToken = this.cookieService.get('jwtToken');
    const tokenPayload = this.decodeToken(jwtToken);
    if (tokenPayload) {
      const userId = tokenPayload.sub;
      const role = tokenPayload.role; // Assuming the role is included in the JWT token
      if (role === 'doctor') {
        this.isDoctor = true;
        this.getDoctorData(userId);
        console.log(this.profile);
      } else {
        this.getPatientData(userId);
        console.log(this.profile);
      }
    }
  }

  decodeToken(token: string): any {
    try {
      const tokenParts = token.split('.');
      const tokenPayload = JSON.parse(atob(tokenParts[1]));
      return tokenPayload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getPatientData(userId: number) {
    this.patientService.getPatient(userId).subscribe(data => {
      this.profile = { ...data };
      console.log(this.profile);
    });
  }

  getDoctorData(userId: number) {
    this.doctorService.getDoctor(userId).subscribe(data => {
      this.profile = { ...data };
      console.log(this.profile);

    });
  }

  onSubmit() {
    if (this.isDoctor)
    {
      console.log("haha")
      this.doctorService.updateDoctor(this.profile.doctorId, this.profile).subscribe(
        response => {
          console.log('Profile updated successfully', response);
        },
        error => {
          console.error('Error updating profile', error);
        }
      );
    } else{
      this.patientService.updatePatient(this.profile.patientId, this.profile).subscribe(
        response => {
          console.log('Profile updated successfully', response);
        },
        error => {
          console.error('Error updating profile', error);
        }
      );
    }
  }

  logout() {
    console.log('Logout');
  }

  isMale(): boolean {
    return this.profile.title === 'MR';
  }

  isFemale(): boolean {
    return this.profile.title === 'MISS';
  }
  deleteAccount() {
    if (this.isDoctor) {
      this.doctorService.deleteDoctor(this.profile.doctorId).subscribe(response => {
        console.log('Account deleted successfully', response);
      });
    } else {
      this.patientService.deletePatient(this.profile.patientId).subscribe(response => {
        console.log('Account deleted successfully', response);
      });
    }
  }
}
