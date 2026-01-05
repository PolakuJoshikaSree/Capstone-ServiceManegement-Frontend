import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TechnicianNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class TechnicianNotificationService {

  private baseUrl = 'http://localhost:8765/api/notifications';

  constructor(private http: HttpClient) {}

  // 🔹 Get notifications for technician
  getNotifications(technicianId: string): Observable<TechnicianNotification[]> {
    return this.http.get<TechnicianNotification[]>(
      `${this.baseUrl}/user/${technicianId}`
    );
  }

  // 🔹 Mark notification as read
  markAsRead(notificationId: string): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/${notificationId}/read`,
      {}
    );
  }
}
