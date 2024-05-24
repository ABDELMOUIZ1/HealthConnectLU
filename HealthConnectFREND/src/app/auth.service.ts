import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import {Doctor, Patient} from "./app.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private forgotPasswordDoctorUrl =  'http://localhost:8082/doctors/forgot-password';  // URL to web api for doctor forgot password
  private forgotPasswordPatientUrl = 'http://localhost:8082/patients/forgot-password';

  private apiUrl = 'http://localhost:8082/patients';
  private doctorLoginUrl = 'http://localhost:8082/doctors/login/doctor';
  private patientLoginUrl = 'http://localhost:8082/patients/login/patient';
  private doctorRegisterUrl = 'http://localhost:8082/doctors/register/doctor';
  private patientRegisterUrl = 'http://localhost:8082/patients/register/patient';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  loginDoctor(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('doctorEmail', email);
    body.set('doctorPassword', password);

    return this.http.post(this.doctorLoginUrl, body.toString(), { headers, responseType: 'text' })
      .pipe(
        tap((token: string) => {
          this.cookieService.set('jwtToken', token, { path: '/' });
        })
      );
  }

  loginPatient(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('patientEmail', email);
    body.set('patientPassword', password);

    return this.http.post(this.patientLoginUrl, body.toString(), { headers, responseType: 'text' })
      .pipe(
        tap((token: string) => {
          this.cookieService.set('jwtToken', token, { path: '/' });
        })
      );
  }

  registerDoctor(doctor: Doctor): Observable<any> {
    return this.http.post(this.doctorRegisterUrl, doctor);
  }

  registerPatient(patient: Patient): Observable<any> {
    return this.http.post(this.patientRegisterUrl, patient);
  }

  forgotPasswordDoctor(email: string): Observable<any> {
    return this.http.post<any>(this.forgotPasswordDoctorUrl, { email });
  }

  forgotPasswordPatient(email: string): Observable<any> {
    return this.http.post<any>(this.forgotPasswordPatientUrl, { email });
  }


}
