import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../notification';

@Component({
  standalone: true,               
  selector: 'app-notifications',
  imports: [CommonModule],       
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.scss']
})
export class NotificationComponent implements OnInit {

  @Input() userId!: string;

  notifications: Notification[] = [];
  open = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService
      .getUserNotifications(this.userId)
      .subscribe(data => this.notifications = data);
  }

  unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  toggle() {
    this.open = !this.open;
  }

  markRead(notification: Notification) {
    if (!notification.read) {
      this.notificationService
        .markAsRead(notification.id)
        .subscribe(() => notification.read = true);
    }
  }
}
