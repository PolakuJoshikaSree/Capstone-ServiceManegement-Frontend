import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-assign-bookings',
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-booking.html',
  styleUrls: ['./assign-booking.scss']
})
export class AssignBookingsComponent implements OnInit {

  bookingId = '';
  technicians: any[] = [];
  selectedTechnicianId = '';
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookingId = this.route.snapshot.paramMap.get('bookingId') || '';
    this.loadTechnicians();
  }

  loadTechnicians(): void {
  this.loading = true;

  this.http.get<any>(
    'http://localhost:8802/api/auth/users/technicians'
  ).subscribe({
    next: (res) => {
      this.technicians = res.data; 
      this.loading = false;
    },
    error: () => {
      this.error = 'Failed to load technicians';
      this.loading = false;
    }
  });
}


  assign(): void {
    if (!this.selectedTechnicianId) {
      this.error = 'Please select a technician';
      return;
    }

    //  MATCH CONTROLLER SIGNATURE
    this.http.put(
      `http://localhost:8084/api/bookings/${this.bookingId}/assign/${this.selectedTechnicianId}`,
      {}
    ).subscribe({
      next: () => this.router.navigate(['/manager']),
      error: () => this.error = 'Assignment failed'
    });
  }
}
