import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-manager-dashboard',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './manager-dashboard.html',
  styleUrls: ['./manager-dashboard.scss']
})
export class ManagerDashboardComponent implements OnInit {

  bookings: any[] = [];
  loading = true;
  error = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRequestedBookings();
  }

  loadRequestedBookings(): void {
    this.loading = true;
    this.error = '';

    this.http.get<any[]>(
      'http://localhost:8765/api/bookings'
    ).subscribe({
      next: (res) => {
        console.log('BOOKINGS FROM API:', res);

        this.bookings = (res || []).filter(
          b => b.status === 'REQUESTED'
        );

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
}
