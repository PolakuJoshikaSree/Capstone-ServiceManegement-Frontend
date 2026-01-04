import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  loading = true;
  error = '';
  success = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.bookingId = this.route.snapshot.paramMap.get('bookingId') || '';
    console.log('📌 Booking ID:', this.bookingId);

    this.loadTechnicians();
  }

  // ================= LOAD TECHNICIANS =================
  loadTechnicians(): void {
    const token = localStorage.getItem('accessToken'); // ✅ FIX

    console.log('🔑 Token:', token);

    this.http.get<any>(
      'http://localhost:8765/api/auth/users/technicians',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({
      next: res => {
        console.log('✅ Technicians response:', res);
        this.technicians = res.data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('❌ Load technicians error:', err);
        this.error = 'Failed to load technicians';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // ================= ASSIGN =================
  assign(): void {
    console.log('➡️ Assign clicked');

    if (!this.selectedTechnicianId) {
      this.error = 'Please select a technician';
      return;
    }

    const token = localStorage.getItem('accessToken'); // ✅ FIX

    console.log('📦 Assign payload:', {
      bookingId: this.bookingId,
      technicianId: this.selectedTechnicianId
    });

    this.http.put(
      `http://localhost:8765/api/bookings/${this.bookingId}/assign/${this.selectedTechnicianId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({
      next: res => {
        console.log('✅ Assign success:', res);
        this.success = 'Technician assigned successfully';
        setTimeout(() => this.router.navigate(['/manager']), 800);
      },
      error: err => {
        console.error('❌ Assign error:', err);
        this.error = 'Assignment failed';
      }
    });
  }
}
