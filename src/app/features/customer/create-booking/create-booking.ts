import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-booking.html',
  styleUrls: ['./create-booking.scss']
})
export class CreateBookingComponent implements OnInit {

  serviceName = '';
  categoryName = '';
  servicePrice = 0; // UI ONLY

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
      this.route.snapshot.queryParamMap.get('serviceName') ?? '';

    this.categoryName =
      this.route.snapshot.queryParamMap.get('categoryName') ?? '';

    this.servicePrice =
      Number(this.route.snapshot.queryParamMap.get('servicePrice')) || 0;
  }

  confirm(): void {

    if (
      !this.scheduledDate ||
      !this.timeSlot ||
      !this.paymentMode ||
      !this.address
    ) {
      this.error = 'Please fill all required fields';
      return;
    }

    this.loading = true;
    this.error = null;

    // 🔥 DO NOT SEND servicePrice
    const payload = {
      serviceName: this.serviceName,
      categoryName: this.categoryName,
      scheduledDate: this.scheduledDate,
      timeSlot: this.timeSlot,
      issueDescription: this.issueDescription,
      paymentMode: this.paymentMode,
      address: this.address
    };

    this.http.post('http://localhost:8765/api/bookings', payload)
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/customer/my-services']);
        },
        error: (err) => {
          this.loading = false;
          this.error = err?.error?.message || 'Booking failed';
        }
      });
  }
}
