import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from '../admin-header/admin-header';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar';

@Component({
  standalone: true,
  selector: 'app-admin-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    AdminHeaderComponent,
    AdminSidebarComponent
  ],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.scss']
})
export class AdminLayoutComponent {}
