import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AvailableSlotDTO, CreateAppointmentDTO} from "./app.model";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8082/appointments'; // Adjust the URL as per your backend endpoint


  constructor(private http: HttpClient, private cookieService: CookieService) {
  }


  takeAppointment(createAppointmentDTO: CreateAppointmentDTO): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.post<void>(`${this.apiUrl}/take`, createAppointmentDTO, { headers });
  }

  private getToken(): string {
    // Implement your logic to get the token, e.g., from a cookie or local storage
    return this.cookieService.get('jwtToken');
  }
}
