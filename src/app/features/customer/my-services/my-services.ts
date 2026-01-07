import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-services.html',
  styleUrls: ['./my-services.scss']
})
export class MyServicesComponent implements OnInit {

  bookings: any[] = [];
  loading = true;
  error = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMyBookings();
  }

  // ================= LOAD BOOKINGS =================
  loadMyBookings(): void {
    this.loading = true;
    this.error = '';
    this.cdr.detectChanges();

    this.http.get<any[]>('http://localhost:8765/api/bookings/my')
      .subscribe({
        next: (res) => {
          this.bookings = Array.isArray(res) ? res : [];
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.loading = false;
          this.error = err.status === 401
            ? 'Please login again'
            : 'Failed to load bookings';
          this.cdr.detectChanges();
        }
      });
  }

  // ================= CANCEL BOOKING =================
  cancelBooking(bookingId: string): void {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    this.http.put(
      `http://localhost:8765/api/bookings/${bookingId}/cancel`,
      {}
    ).subscribe({
      next: () => {
        this.loadMyBookings();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Cancel failed';
        this.cdr.detectChanges();
      }
    });
  }

  // ================= RESCHEDULE BOOKING =================
  openReschedule(booking: any): void {

    const newDate = prompt(
      'Enter new date (YYYY-MM-DD):',
      booking.scheduledDate
    );

    const newTimeSlot = prompt(
      'Enter new time slot (HH:MM - HH:MM):',
      booking.timeSlot
    );

    if (!newDate || !newTimeSlot) {
      return;
    }

    const payload = {
      scheduledDate: newDate,
      timeSlot: newTimeSlot
    };

    this.http.put(
      `http://localhost:8765/api/bookings/${booking.bookingId}/reschedule`,
      payload
    ).subscribe({
      next: () => {
        this.loadMyBookings();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Reschedule failed';
        this.cdr.detectChanges();
      }
    });
  }

  // ================= TRACK BY =================
  trackByBookingId(index: number, item: any): string {
    return item?.bookingId ?? index.toString();
  }
}
