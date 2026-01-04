import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-update-status',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './update-status.html',
  styleUrls: ['./update-status.scss']
})
export class UpdateStatusComponent implements OnInit {

  bookingId = '';
  status: 'IN_PROGRESS' | 'COMPLETED' = 'IN_PROGRESS';
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookingId =
      this.route.snapshot.paramMap.get('bookingId') || '';
  }

  update(): void {
    if (!this.status) return;

    this.loading = true;
    this.error = '';

    this.http.put(
      `http://localhost:8765/api/bookings/${this.bookingId}/status`,
      { status: this.status }
    ).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/technician/tasks']);
      },
      error: (err) => {
        console.error('Update failed', err);
        this.error = 'Failed to update booking status';
        this.loading = false;
      }
    });
  }
}
