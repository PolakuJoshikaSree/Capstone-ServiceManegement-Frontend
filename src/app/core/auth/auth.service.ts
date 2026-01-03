import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private BASE_URL = 'http://localhost:8802/auth-service/api/auth';

  constructor(private http: HttpClient) {}

  login(payload: { email: string; password: string }) {
    return this.http.post<any>(`${this.BASE_URL}/login`, payload)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.data.accessToken);
          localStorage.setItem('roles', res.data.roles.join(','));
          localStorage.setItem('userId', res.data.userId);
        })
      );
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRoles(): string[] {
    return (localStorage.getItem('roles') || '').split(',');
  }
}
