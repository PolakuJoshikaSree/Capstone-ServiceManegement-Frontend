import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrls: ['./users.scss']
})
export class UsersComponent implements OnInit {

  users: any[] = [];
  loading = true;
  error = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;

    this.http
      .get<any>('http://localhost:8765/api/users')
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
}
