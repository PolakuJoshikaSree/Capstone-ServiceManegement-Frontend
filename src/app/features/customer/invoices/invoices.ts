import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-invoices',
  imports: [CommonModule],
  templateUrl: './invoices.html',
  styleUrls: ['./invoices.scss']
})
export class InvoicesComponent implements OnInit {

  invoices: any[] = [];
  customerId = '';
  loading = false;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.customerId = localStorage.getItem('userId') || '';
    this.loadInvoices();
  }

  loadInvoices(): void {
    if (!this.customerId) return;

    this.loading = true;

    this.http
      .get<any[]>(
        `http://localhost:8765/api/billing/invoices/customer/${this.customerId}`
      )
      .subscribe({
        next: (res) => {
          this.invoices = res || [];
          this.loading = false;

          this.cdr.detectChanges();
        },
        error: () => {
          this.invoices = [];
          this.loading = false;

          this.cdr.detectChanges();
        }
      });
  }

  payInvoice(bookingId: string): void {
    this.http
      .put(
        `http://localhost:8765/api/billing/invoices/${bookingId}/pay`,
        {}
      )
      .subscribe(() => {
        this.loadInvoices();

        this.cdr.detectChanges();
      });
  }
}
