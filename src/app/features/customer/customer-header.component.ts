import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-customer-header',
  imports: [CommonModule],
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

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
