import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Doctor, Patient } from '../app.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  userType: 'doctor' | 'patient' | undefined;

  doctorData: Doctor = {
    doctorFirstName: '',
    doctorLastName: '',
    age: 0,
    title: 'MR',
    cityOfBirth: '',
    address: '',
    currentCity: '',
    doctorEmail: '',
    doctorPassword: '',
    doctorContact: '',
    officeAddress: '',
    specialization: 'Family_Medicine',
    startTimeOfWork: '',
    endTimeOfWork: '',
    newPassword: ''
  };

  patientData: Patient = {
    patientFirstName: '',
    patientLastName: '',
    age: 0,
    title: 'MR',
    cityOfBirth: '',
    address: '',
    currentCity: '',
    patientEmail: '',
    patientPassword: '',
    patientContact: ''
  };

  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) {}

  setUserType(type: 'doctor' | 'patient') {
    this.userType = type;
    this.errorMessage = '';
    this.successMessage = '';
    console.log(`User type set to: ${this.userType}`);
  }

  onSubmit() {
    if (this.userType === 'doctor') {
      if (this.doctorData.doctorPassword !== this.confirmPassword) {
        this.errorMessage = 'Les mots de passe ne correspondent pas.';
        console.error('Doctor passwords do not match');
        return;
      }
      console.log('Submitting doctor registration', this.doctorData);
      this.authService.registerDoctor(this.doctorData).subscribe(
        response => {
          console.log('Doctor Registration successful!', response);
          this.successMessage = 'Inscription réussie! Redirection vers la page de connexion...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error => {
          console.error('Doctor Registration failed', error);
          this.errorMessage = 'Échec de l\'inscription du médecin.';
        }
      );
    } else if (this.userType === 'patient') {
      if (this.patientData.patientPassword !== this.confirmPassword) {
        this.errorMessage = 'Les mots de passe ne correspondent pas.';
        console.error('Patient passwords do not match');
        return;
      }
      console.log('Submitting patient registration', this.patientData);
      this.authService.registerPatient(this.patientData).subscribe(
        response => {
          console.log('Patient Registration successful!', response);
          this.successMessage = 'Inscription réussie! Redirection vers la page de connexion...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error => {
          console.error('Patient Registration failed', error);
          this.errorMessage = 'Échec de l\'inscription du patient.';
        }
      );
    } else {
      this.errorMessage = 'Veuillez sélectionner un type d\'utilisateur.';
    }
  }
}
