import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class AdminDashboardComponent implements OnInit {

  stats = {
    totalBookings: 0,
    completed: 0,
    inProgress: 0,
    assigned: 0,
    requested: 0
  };

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.http
      .get<any[]>('http://localhost:8765/api/bookings')
      .subscribe(bookings => {

        this.stats.totalBookings = bookings.length;

        this.stats.completed =
          bookings.filter(b => b.status === 'COMPLETED').length;

        this.stats.inProgress =
          bookings.filter(b => b.status === 'IN_PROGRESS').length;

        this.stats.assigned =
          bookings.filter(b => b.status === 'ASSIGNED').length;

        this.stats.requested =
          bookings.filter(b => b.status === 'REQUESTED').length;

        this.cdr.detectChanges(); // safe
      });
  }
}
