import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  phoneNumber = '';
  address = '';
  city = '';
  state = '';
  zipCode = '';

  error = '';
  loading = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register() {
    this.error = '';
    this.loading = true;

    const payload = {
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      email: this.email.trim(),
      password: this.password,
      phoneNumber: this.phoneNumber.trim(),
      role: 'CUSTOMER',
      address: this.address,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode
    };

    this.http.post<any>(
      'http://localhost:8765/api/auth/register',
      payload
    ).subscribe({
      next: (res) => {
        const token = res.data.accessToken;
        const role = res.data.user.role; // CUSTOMER

        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        this.router.navigate(['/customer/services']);
      },
      error: (err) => {
        this.error =
          err.error?.message ||
          err.error ||
          'Registration failed';
        this.loading = false;
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
