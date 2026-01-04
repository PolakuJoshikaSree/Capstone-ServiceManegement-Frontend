import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-admin-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sidebar.html',
  styleUrls: ['./admin-sidebar.scss']
})
export class AdminSidebarComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
