import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TechnicianNotificationService,
  TechnicianNotification
} from './notification.service';

@Component({
  standalone: true,
  selector: 'app-technician-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.scss']
})
export class TechnicianNotificationsComponent implements OnInit {

  notifications: TechnicianNotification[] = [];
  technicianId = localStorage.getItem('userId')!;

  constructor(
    private notificationService: TechnicianNotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.notificationService
      .getNotifications(this.technicianId)
      .subscribe(res => {
        this.notifications = res;
        this.cdr.detectChanges(); 
      });
  }

  markRead(n: TechnicianNotification) {
    if (!n.read) {
      this.notificationService
        .markAsRead(n.id)
        .subscribe(() => {
          n.read = true;
          this.cdr.detectChanges();
        });
    }
  }

  trackById(index: number, n: TechnicianNotification) {
    return n.id;
  }
}
