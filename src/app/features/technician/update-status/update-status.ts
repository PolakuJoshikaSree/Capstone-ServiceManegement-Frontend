import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-update-status',
  imports: [
    CommonModule,   // *ngIf, *ngFor
    FormsModule,    // ngModel 
    RouterModule
  ],
  templateUrl: './update-status.html',
  styleUrls: ['./update-status.scss']
})
export class UpdateStatusComponent implements OnInit {

  bookingId = '';
  status = 'IN_PROGRESS';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookingId = this.route.snapshot.paramMap.get('bookingId') || '';
  }

  update(): void {
    this.http.put(
      `http://localhost:8765/api/bookings/${this.bookingId}/status`,
      { status: this.status }
    ).subscribe(() => {
      this.router.navigate(['/technician/tasks']);
    });
  }
}
