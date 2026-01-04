import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-task-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss']
})
export class TaskListComponent implements OnInit {

  tasks: any[] = [];
  loading = true;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef   // inject
  ) {}

  ngOnInit(): void {
    this.http
      .get<any[]>('http://localhost:8765/api/bookings/technician/my')
      .subscribe({
        next: (res) => {
          console.log('Assigned tasks:', res);

          this.tasks = res || [];
          this.loading = false;

          this.cdr.detectChanges(); // force UI update
        },
        error: (err) => {
          console.error('Failed to load tasks', err);

          this.loading = false;
          this.cdr.detectChanges(); //ensure spinner stops
        }
      });
  }
}
