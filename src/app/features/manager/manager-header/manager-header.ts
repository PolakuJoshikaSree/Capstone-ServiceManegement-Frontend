import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-manager-header',
  imports: [CommonModule],
  templateUrl: './manager-header.html',
  styleUrls: ['./manager-header.scss']
})
export class ManagerHeaderComponent {

  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/manager']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
