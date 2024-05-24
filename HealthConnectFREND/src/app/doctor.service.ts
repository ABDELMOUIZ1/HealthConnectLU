// src/app/doctor.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AvailableSlotDTO, Doctor, DoctorDTO, DoctorSearchDTO} from './app.model';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:8082/doctors'; // Adjust the URL as per your backend endpoint

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  searchDoctors(searchDTO: DoctorSearchDTO): Observable<DoctorDTO[]> {
    // Assuming the backend endpoint for searching doctors is '/search'
    return this.http.post<DoctorDTO[]>(`${this.apiUrl}/search`, searchDTO);
  }

  getDoctor(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
  }

  updateDoctor(id: number, doctor: Doctor): Observable<Doctor> {
    console.log("jaja")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);

    return this.http.put<Doctor>(`${this.apiUrl}/update/${id}`, doctor, {headers});
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }


  checkDoctorAvailability(doctorId: number, date: string | undefined): Observable<AvailableSlotDTO[]> {
    return this.http.get<AvailableSlotDTO[]>(`${this.apiUrl}/${doctorId}/availability?date=${date}`, );
  }

  private getToken(): string {
    // Implement your logic to get the token, e.g., from a cookie or local storage
    return this.cookieService.get('jwtToken');
  }
}
