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
  this.http.post<any>('http://localhost:8802/api/auth/login', {
    email: this.email,
    password: this.password
  }).subscribe({
    next: (res) => {

      const token = res.data.accessToken;
      const role = res.data.user.role; // ADMIN | MANAGER | TECHNICIAN | CUSTOMER

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      console.log('Logged in as:', role);

      switch (role) {
        case 'ADMIN':
          this.router.navigate(['/manager']);
          break;

        case 'MANAGER':
          this.router.navigate(['/manager']);
          break;

        case 'TECHNICIAN':
          this.router.navigate(['/technician/tasks']);
          break;

        case 'CUSTOMER':
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
