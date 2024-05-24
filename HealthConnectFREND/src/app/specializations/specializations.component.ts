import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { DoctorDTO, DoctorSearchDTO, Specialization } from "../app.model";

@Component({
  selector: 'app-specializations',
  templateUrl: './specializations.component.html',
  styleUrls: ['./specializations.component.css']
})
export class SpecializationsComponent implements OnInit {
  specializations: Specialization[] = Object.values(Specialization);
  visibleSpecializations: Specialization[] = [];
  showMoreAvailable: boolean = true;
  noDoctorsFound: boolean = false;

  constructor(private doctorService: DoctorService, private router: Router) {}

  ngOnInit(): void {
    this.showMore();
  }

  showMore() {
    const additional = this.specializations.slice(this.visibleSpecializations.length, this.visibleSpecializations.length + 6);
    this.visibleSpecializations = [...this.visibleSpecializations, ...additional];
    this.showMoreAvailable = this.visibleSpecializations.length < this.specializations.length;
  }

  showLess() {
    this.visibleSpecializations = this.specializations.slice(0, 6);
    this.showMoreAvailable = true;
  }

  searchBySpecialization(specialization: Specialization) {
    const searchDTO: DoctorSearchDTO = { specialization };
    this.doctorService.searchDoctors(searchDTO).subscribe((doctors: DoctorDTO[]) => {
      if (doctors.length > 0) {
        this.router.navigate(['/doctor-list'], { state: { doctors } });
        this.noDoctorsFound = false;
      } else {
        this.noDoctorsFound = true;
      }
    });
  }
}
