import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-billing',
  imports: [CommonModule],
  templateUrl: './billing.html',
  styleUrls: ['./billing.scss']
})
export class BillingComponent implements OnInit {

  invoices: any[] = [];
  loading = true;
  error = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices() {
    this.loading = true;

    this.http
      .get<any[]>('http://localhost:8765/api/billing/invoices')
      .subscribe({
        next: res => {
          this.invoices = res;  
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: err => {
          console.error(err);
          this.error = 'Failed to load invoices';
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }
}
