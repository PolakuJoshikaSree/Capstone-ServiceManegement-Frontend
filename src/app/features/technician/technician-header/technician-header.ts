import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  TechnicianNotificationService,
  TechnicianNotification
} from '../notifications/notification.service';

@Component({
  selector: 'app-technician-header',
  standalone: true,
  imports: [
    CommonModule  
  ],
  templateUrl: './technician-header.html',
  styleUrls: ['./technician-header.scss']
})
export class TechnicianHeaderComponent implements OnInit {

  technicianId = localStorage.getItem('userId') || '';

  notifications: TechnicianNotification[] = [];
  unreadCount = 0;
  showNotifications = false;  

  constructor(
    private router: Router,
    private notificationService: TechnicianNotificationService
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService
      .getNotifications(this.technicianId)
      .subscribe(data => {
        this.notifications = data;
        this.unreadCount = data.filter(n => !n.read).length;
      });
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  markRead(n: TechnicianNotification) {
    if (!n.read) {
      this.notificationService
        .markAsRead(n.id)
        .subscribe(() => {
          n.read = true;
          this.unreadCount--;
        });
    }
  }

  trackById(index: number, n: TechnicianNotification) {
    return n.id;
  }

  goTasks() {
    this.router.navigate(['/technician/tasks']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
