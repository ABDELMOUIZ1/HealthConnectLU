import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AppointmentService } from '../appointment.service';
import {AvailableSlotDTO, CreateAppointmentDTO, StatusAppointment} from '../app.model';
import {DoctorService} from "../doctor.service";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  availableSlots: AvailableSlotDTO[] = [];
  selectedSlot?: AvailableSlotDTO | undefined;
  selectedDate?: string | undefined;
  doctorId?: number;
  patientId?: number;
  errorMessage: string | undefined;


  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService,
    private appointmentService: AppointmentService,
  private doctorService: DoctorService

)

  {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.doctorId = navigation.extras.state['doctorId'];
     this.doctorFirstName = navigation.extras.state['doctorFirstName'];
     this.doctorLastName = navigation.extras.state['doctorLastName'];
     this.specialization = navigation.extras.state['specialization'];
      console.log("haha" + this.doctorId);
    }
  }

  doctorFirstName : String | undefined;
  doctorLastName : String | undefined;
  specialization : String | undefined;
  ngOnInit(): void {
    const jwtToken = this.cookieService.get('jwtToken');
    const tokenPayload = this.decodeToken(jwtToken);
    if (tokenPayload) {
      this.patientId = tokenPayload.sub;
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

  onDateSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedDate = target.value;
    if (this.selectedDate && this.doctorId) {
      this.doctorService.checkDoctorAvailability(this.doctorId, this.selectedDate).subscribe(slots => {
        this.availableSlots = slots;
      });
    }
  }

  onSlotSelected(slot: AvailableSlotDTO): void {
    this.selectedSlot = slot;
  }

  onSubmit(): void {
    if (this.selectedSlot && this.selectedDate && this.patientId && this.doctorId) {
      const appointment: CreateAppointmentDTO = {
        startTime: this.selectedSlot.startTime,
        availableSlotDTO: this.selectedSlot,
        statusAppointment: StatusAppointment.PENDING,
        patientId: this.patientId,
        doctorId: this.doctorId,
        dateOnly: this.selectedDate
      };

      this.appointmentService.takeAppointment(appointment).subscribe(
        response => {
          console.log('Appointment booked successfully', response);
        },
        error => {
          console.error('Error booking appointment', error);
        }
      );
    } else {
      this.errorMessage = 'Tu ne peux pas prendre un rendez-vous, il faut que tu te connectes';
    }
  }

}
