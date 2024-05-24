import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorDTO } from "../app.model";

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  doctors: DoctorDTO[] = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.doctors = navigation.extras.state['doctors'];
    }
  }

  ngOnInit(): void {
    // Handle case if navigating directly to the page
    if (this.doctors.length === 0) {
      this.router.navigate(['/']);
    }
  }

  // Function to navigate to appointment component with the selected doctor ID
  navigateToAppointment(doctor: DoctorDTO): void {
    this.router.navigate(['/appointment'], {
      state: {
        doctorId: doctor.doctorId,
        doctorFirstName: doctor.doctorFirstName,
        doctorLastName: doctor.doctorLastName,
        specialization: doctor.specialization
      }
    });
  }

}
