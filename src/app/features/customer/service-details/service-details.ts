import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-service-details',
  imports: [CommonModule],
  templateUrl: './service-details.html',
  styleUrls: ['./service-details.scss']
})
export class ServiceDetailsComponent implements OnInit {

  service: any = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.isLoading = false;
      this.errorMessage = 'Invalid service ID';
      return;
    }

    this.http
      .get(`http://localhost:8765/api/services/${id}`)
      .subscribe({
        next: (res) => {
          this.service = res;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = 'Failed to load service details';
          this.cdr.detectChanges();
        }
      });
  }

  bookService(): void {
    this.router.navigate(['/customer/create-booking'], {
      queryParams: {
        serviceName: this.service.name,
        categoryName: this.service.categoryName
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/customer/services']);
  }
}
