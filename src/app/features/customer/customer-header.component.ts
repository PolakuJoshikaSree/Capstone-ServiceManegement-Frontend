import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-customer-header',
  imports: [CommonModule, RouterModule], // ✅ RouterModule REQUIRED
  templateUrl: './customer-header.html',
  styleUrls: ['./customer-header.scss']
})
export class CustomerHeaderComponent {

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/customer/services']);
  }

  goMyBookings() {
    this.router.navigate(['/customer/my-services']);
  }

  goInvoices() {
  console.log('Token:', localStorage.getItem('token'));
  this.router.navigate(['/customer/invoices']);
}


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
