import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  email = '';
  password = '';
  error = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(): void {
  this.http.post<any>('http://localhost:8765/api/auth/login', {
    email: this.email,
    password: this.password
  }).subscribe({
    next: (res) => {
      const token = res.data.accessToken;
      const role = res.data.user.role;
      const userId = res.data.user.id;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('userId', userId);

      switch (role) {
        case 'ADMIN':
          this.router.navigate(['/admin/dashboard']);
          break;
        case 'MANAGER':
          this.router.navigate(['/manager']);
          break;
        case 'TECHNICIAN':
          this.router.navigate(['/technician/tasks']);
          break;
        default:
          this.router.navigate(['/customer/services']);
      }
    },
    error: err => {
      this.error = err.error?.message || 'Login failed';
    }
  });
}

}
