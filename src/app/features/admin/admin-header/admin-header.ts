import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  standalone: true, 
  templateUrl: './admin-header.html',
  styleUrls: ['./admin-header.scss']
})
export class AdminHeaderComponent {

  constructor(private router: Router) {}

  goDashboard() {
    this.router.navigate(['/admin/dashboard']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
