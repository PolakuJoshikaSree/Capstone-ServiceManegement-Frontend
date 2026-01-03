import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CustomerHeaderComponent } from '../customer-header.component';

@Component({
  standalone: true,
  selector: 'app-customer-layout',
  imports: [CommonModule, RouterOutlet, CustomerHeaderComponent],
  template: `
    <app-customer-header></app-customer-header>
    <router-outlet></router-outlet>
  `
})
export class CustomerLayoutComponent {}
