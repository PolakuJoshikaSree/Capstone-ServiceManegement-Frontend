import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-assign-technician',
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-technician.html'
})
export class AssignTechnicianComponent implements OnInit {

  bookings: any[] = [];
  selectedTechnician: { [bookingId: string]: string } = {};

  loading = true;
  error = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  // ================= LOAD BOOKINGS =================
  loadBookings(): void {
    this.loading = true;
    this.error = '';

    this.http.get<any[]>(
      'http://localhost:8765/api/bookings',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    ).subscribe({
      next: data => {
        this.bookings = data.filter(b => b.status === 'REQUESTED');
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error(err);
        this.error = 'Failed to load bookings';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // ================= ASSIGN TECHNICIAN =================
  assign(bookingId: string): void {
    const technicianId = this.selectedTechnician[bookingId];

    if (!technicianId) {
      alert('Please enter technician ID');
      return;
    }

    this.http.put(
      `http://localhost:8765/api/bookings/${bookingId}/assign/${technicianId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    ).subscribe({
      next: () => {
        alert('Technician assigned');
        this.loadBookings();
      },
      error: err => {
        console.error(err);
        alert('Assignment failed');
      }
    });
  }
}
