import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Patient} from "./app.model";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:8082/patients'; // Ajustez l'URL si nécessaire

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/create`, patient);
  }

  updatePatient(patientId: number | undefined, patient: Patient): Observable<Patient> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.put<Patient>(`${this.apiUrl}/update/${patientId}`, patient, {headers});
  }

  deletePatient(patientId: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${patientId}`);
  }

  getPatient(patientId: number | undefined): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${patientId}`);
  }

  private getToken(): string {
    // Implement your logic to get the token, e.g., from a cookie or local storage
    return this.cookieService.get('jwtToken');
  }}
