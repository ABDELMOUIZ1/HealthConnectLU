import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { email: '', password: '' };
  rememberMe = false;
  userType: 'doctor' | 'patient' = 'doctor'; // Default to 'doctor'
  showForgotPasswordModal = false;
  forgotPasswordData = { email: '' };

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }

  setUserType(type: 'doctor' | 'patient') {
    this.userType = type;
  }

  onSubmit() {
    console.log('Submitting login form', this.loginData);
    if (this.userType === 'doctor') {
      this.authService.loginDoctor(this.loginData.email, this.loginData.password)
        .subscribe(
          response => {
            console.log('Login successful!', response);
            console.log('Token stored in cookies, navigating to /search');
            this.router.navigate(['/search']);
          },
          error => {
            console.error('Login failed', error);
          }
        );
    } else {
      this.authService.loginPatient(this.loginData.email, this.loginData.password)
        .subscribe(
          response => {
            console.log('Login successful!', response);
            console.log('Token stored in cookies, navigating to /search');
            this.router.navigate(['/search']);
          },
          error => {
            console.error('Login failed', error);
          }
        );
    }
  }

  openForgotPasswordModal() {
    this.showForgotPasswordModal = true;
  }

  closeForgotPasswordModal() {
    this.showForgotPasswordModal = false;
  }

  onForgotPasswordSubmit() {
    console.log('Sending OTP to email:', this.forgotPasswordData.email);
    if (this.userType === 'doctor') {
      this.authService.forgotPasswordDoctor(this.forgotPasswordData.email)
        .subscribe(
          response => {
            console.log('OTP sent to doctor email', response);
            // Handle OTP submission and verification
          },
          error => {
            console.error('Failed to send OTP', error);
          }
        );
    } else {
      this.authService.forgotPasswordPatient(this.forgotPasswordData.email)
        .subscribe(
          response => {
            console.log('OTP sent to patient email', response);
            // Handle OTP submission and verification
          },
          error => {
            console.error('Failed to send OTP', error);
          }
        );
    }
  }
}
