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
    private cdr: ChangeDetectorRef   // ✅ explicitly inject
  ) {}

  ngOnInit(): void {
    this.loadMyBookings();
  }

  loadMyBookings(): void {
    this.loading = true;
    this.error = '';

    this.http.get<any[]>(
      'http://localhost:8084/api/bookings/my-bookings'
    ).subscribe({
      next: (res) => {
        console.log('MY BOOKINGS →', res);

        this.bookings = res || [];
        this.loading = false;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);

        this.error = 'Failed to load bookings';
        this.loading = false;

        this.cdr.detectChanges();
      }
    });
  }

  trackByBookingId(index: number, item: any): string {
    return item.bookingId;
  }
}
