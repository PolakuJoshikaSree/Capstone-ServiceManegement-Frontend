import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-technician-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './technician-sidebar.html',
  styleUrls: ['./technician-sidebar.scss']
})
export class TechnicianSidebarComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
