import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TechnicianHeaderComponent } from '../technician-header/technician-header';
import { TechnicianSidebarComponent } from '../technician-sidebar/technician-sidebar';

@Component({
  standalone: true,
  selector: 'app-technician-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    TechnicianHeaderComponent,
    TechnicianSidebarComponent
  ],
  templateUrl: './technician-layout.html',
  styleUrls: ['./technician-layout.scss']
})
export class TechnicianLayoutComponent {}
