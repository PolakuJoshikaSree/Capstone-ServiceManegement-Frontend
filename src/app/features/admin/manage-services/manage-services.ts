import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-manage-services',
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-services.html',
  styleUrls: ['./manage-services.scss']
})
export class ManageServicesComponent implements OnInit {

  services: any[] = [];
  showAddForm = false;

  newService = {
    name: '',
    category: '',
    price: 0,
    description: ''
  };

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    this.http
      .get<any[]>('http://localhost:8765/api/services')
      .subscribe({
        next: data => {
          this.services = data;
          this.cdr.detectChanges(); 
        },
        error: err => console.error(err)
      });
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  addService() {
    this.http.post(
      'http://localhost:8765/api/services',
      this.newService
    ).subscribe({
      next: () => {
        alert('Service added successfully');
        this.showAddForm = false;
        this.newService = { name: '', category: '', price: 0, description: '' };
        this.loadServices();
      },
      error: err => {
        console.error(err);
        alert('Failed to add service');
      }
    });
  }
}
