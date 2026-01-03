import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-booking',
  standalone: true,
  imports: [
    CommonModule,   // ✅ for *ngIf
    FormsModule     // ✅ for ngModel
  ],
  templateUrl: './create-booking.html',
  styleUrls: ['./create-booking.scss']
})
export class CreateBookingComponent implements OnInit {

  serviceName = '';
  categoryName = '';

  scheduledDate = '';
  timeSlot = '';
  issueDescription = '';
  paymentMode = '';
  address = '';

  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.serviceName =
      this.route.snapshot.queryParamMap.get('serviceName') || '';

    this.categoryName =
      this.route.snapshot.queryParamMap.get('categoryName') || '';
  }

  confirm(): void {
    this.error = null;
    this.loading = true;

    const payload = {
      serviceName: this.serviceName,
      categoryName: this.categoryName,
      scheduledDate: this.scheduledDate,
      timeSlot: this.timeSlot,
      issueDescription: this.issueDescription,
      paymentMode: this.paymentMode,
      address: this.address
    };

    this.http.post('http://localhost:8084/api/bookings', payload)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/customer/my-services');
        },
        error: (err) => {
          this.loading = false;
          this.error = err?.error?.message || 'Booking failed';
        }
      });
  }
}
