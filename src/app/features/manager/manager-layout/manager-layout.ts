import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ManagerHeaderComponent } from '../manager-header/manager-header';

@Component({
  standalone: true,
  selector: 'app-manager-layout',
  imports: [CommonModule, RouterOutlet, ManagerHeaderComponent],
  template: `
    <app-manager-header></app-manager-header>
    <router-outlet></router-outlet>
  `
})
export class ManagerLayoutComponent {}
