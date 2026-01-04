import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-service-catalog',
  imports: [CommonModule, FormsModule],
  templateUrl: './service-catalog.html',
  styleUrls: ['./service-catalog.scss']
})
export class ServiceCatalogComponent implements OnInit {

  services: any[] = [];
  groupedServices: Record<string, any[]> = {};
  filteredGroupedServices: Record<string, any[]> = {};

  categories: string[] = [];
  selectedCategory = 'All';
  searchText = '';

  isLoading = true;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  private loadServices(): void {
    this.isLoading = true;

    this.http
      .get<any[]>('http://localhost:8765/api/services')
      .subscribe({
        next: (res) => {
          this.services = res || [];
          this.groupServices();
          this.categories = Object.keys(this.groupedServices);
          this.applyFilters();
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = 'Failed to load services';
          this.cdr.detectChanges();
        }
      });
  }

  private groupServices(): void {
    this.groupedServices = {};
    this.services.forEach(service => {
      const category = service.categoryName || 'Other';
      this.groupedServices[category] ??= [];
      this.groupedServices[category].push(service);
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSearch(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    const text = this.searchText.toLowerCase().trim();
    this.filteredGroupedServices = {};

    Object.keys(this.groupedServices).forEach(category => {
      if (this.selectedCategory !== 'All' &&
          category !== this.selectedCategory) return;

      const services = this.groupedServices[category];
      const filtered = text
        ? services.filter(s =>
            s.name.toLowerCase().includes(text) ||
            s.description?.toLowerCase().includes(text)
          )
        : services;

      if (filtered.length > 0) {
        this.filteredGroupedServices[category] = filtered;
      }
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/customer/service', id]);
  }

  trackByKey(index: number, item: KeyValue<string, any[]>): string {
    return item.key;
  }
}
