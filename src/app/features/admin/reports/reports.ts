import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrls: ['./reports.scss']
})
export class ReportsComponent implements OnInit {

  bookingStatusReports: any[] = [];
  technicianTaskReports: any[] = [];
  loading = false;
  error = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.loading = true;
    this.error = '';

    // 🔹 Booking count by status
    this.http.get<any[]>(
      'http://localhost:8765/api/reports/bookings-by-status'
    ).subscribe({
      next: (res) => {
        this.bookingStatusReports = res;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load booking status report';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });

    // 🔹 Technician-wise task count
    this.http.get<any[]>(
      'http://localhost:8765/api/reports/technician-task-count'
    ).subscribe({
      next: (res) => {
        this.technicianTaskReports = res;
        this.loading = false;     
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load technician task report';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
