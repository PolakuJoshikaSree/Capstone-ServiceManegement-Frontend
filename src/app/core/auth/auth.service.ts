import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  // API GATEWAY ONLY
  private BASE_URL = 'http://localhost:8765/api/auth';

  constructor(private http: HttpClient) {}

  // ================= LOGIN =================
  login(payload: { email: string; password: string }) {
    return this.http.post<any>(`${this.BASE_URL}/login`, payload)
      .pipe(
        tap(res => {
          // BACKEND RESPONSE STRUCTURE YOU USE
          const token = res.data.accessToken;
          const role = res.data.user.role;   // ADMIN / CUSTOMER / TECHNICIAN / MANAGER
          const userId = res.data.user.id;

          // STORE CONSISTENT KEYS
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);
          localStorage.setItem('userId', userId);
        })
      );
  }

  // ================= LOGOUT =================
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
  }

  // ================= AUTH HELPERS =================
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
