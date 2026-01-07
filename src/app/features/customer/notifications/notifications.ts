import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../notification';

@Component({
  standalone: true,
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit, OnDestroy {

  @Input() userId!: string;

  notifications: Notification[] = [];
  unreadCount = 0;
  open = false;

  private intervalId: any;

  constructor(
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadNotifications();

    // 🔹 AUTO REFRESH EVERY 5 SECONDS
    this.intervalId = setInterval(() => {
      this.loadNotifications();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadNotifications(): void {
    if (!this.userId) return;

    this.notificationService
      .getUserNotifications(this.userId)
      .subscribe(data => {
        this.notifications = data;
        this.unreadCount = data.filter(n => !n.read).length;

        // Required because of OnPush
        this.cdr.markForCheck();
      });
  }

  toggle(): void {
    this.open = !this.open;
  }

  markRead(notification: Notification): void {
    if (!notification.read) {
      this.notificationService
        .markAsRead(notification.id)
        .subscribe(() => {
          notification.read = true;
          this.unreadCount--;
          this.cdr.markForCheck();
        });
    }
  }
}
