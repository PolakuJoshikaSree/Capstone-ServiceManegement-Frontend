import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrls: ['./users.scss']
})
export class UsersComponent implements OnInit {

  users: any[] = [];
  loading = true;
  error = '';

  showAddUser = false;

  // ✅ MUST MATCH RegisterUserDTO
  newUser = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  };

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;

    this.http.get<any>('http://localhost:8765/api/users')
      .subscribe({
        next: res => {
          this.users = res.data || [];
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: err => {
          console.error(err);
          this.error = 'Failed to load users';
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  createUser() {
    const u = this.newUser;

    // ✅ Frontend validation aligned with backend
    if (
      !u.firstName ||
      !u.lastName ||
      !u.email ||
      !u.phoneNumber ||
      !u.password ||
      !u.role
    ) {
      alert('All required fields must be filled');
      return;
    }

    this.http
      .post<any>('http://localhost:8765/api/auth/register', u)
      .subscribe({
        next: () => {
          alert('User created successfully');
          this.cancel();
          this.loadUsers();
        },
        error: err => {
          console.error(err);
          alert(err.error?.message || 'Failed to create user');
        }
      });
  }

  cancel() {
    this.showAddUser = false;

    // reset form
    this.newUser = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      role: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    };
  }
}
