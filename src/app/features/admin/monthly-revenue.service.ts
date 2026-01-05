import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonthlyRevenueService {

  constructor(private http: HttpClient) {}

  getMonthlyRevenue(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(
      'http://localhost:8765/api/billing/invoices/reports/monthly-revenue'
    );
  }
}
