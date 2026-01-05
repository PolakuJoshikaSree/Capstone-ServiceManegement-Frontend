import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyRevenueService } from '../monthly-revenue.service';

@Component({
  standalone: true,
  selector: 'app-monthly-revenue',
  imports: [CommonModule],
  templateUrl: './monthly-revenue.html',
  styleUrls: ['./monthly-revenue.scss']
})
export class MonthlyRevenueComponent implements OnInit {

  monthlyRevenue: Record<string, number> = {};
  revenueLoaded = false;

  constructor(
    private revenueService: MonthlyRevenueService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMonthlyRevenue();
  }

  private loadMonthlyRevenue(): void {
    this.revenueService.getMonthlyRevenue().subscribe({
      next: (data) => {
        this.monthlyRevenue = data;
        this.revenueLoaded = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Monthly revenue load failed', err);
        this.revenueLoaded = true;
        this.cdr.detectChanges();
      }
    });
  }
}
