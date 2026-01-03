import { Routes } from '@angular/router';
import { ManagerLayoutComponent } from './manager-layout/manager-layout';
import { ManagerDashboardComponent } from './dashboard/manager-dashboard';
import { AssignBookingsComponent } from './assign-booking/assign-booking';

export const MANAGER_ROUTES: Routes = [
  {
    path: '',
    component: ManagerLayoutComponent,
    children: [
      { path: '', component: ManagerDashboardComponent },
      { path: 'assign/:bookingId', component: AssignBookingsComponent }
    ]
  }
];
