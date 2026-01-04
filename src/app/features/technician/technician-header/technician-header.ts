import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-technician-header',
  standalone: true,
  imports: [RouterOutlet],   
  templateUrl: './technician-header.html',
  styleUrls: ['./technician-header.scss']
})
export class TechnicianHeaderComponent {

  constructor(private router: Router) {}

  goTasks() {
    this.router.navigate(['/technician/tasks']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
