import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NotificationComponent } from './notifications/notifications';

@Component({
  standalone: true,
  selector: 'app-customer-header',
  imports: [
    CommonModule,
    RouterModule,
    NotificationComponent   // ✅ ADD THIS
  ],
  templateUrl: './customer-header.html',
  styleUrls: ['./customer-header.scss']
})
export class CustomerHeaderComponent {

  userId = localStorage.getItem('userId')!; // or decode from JWT

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/customer/services']);
  }

  goMyBookings() {
    this.router.navigate(['/customer/my-services']);
  }

  goInvoices() {
    this.router.navigate(['/customer/invoices']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
