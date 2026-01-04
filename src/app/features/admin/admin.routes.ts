import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout';
import { AdminDashboardComponent } from './dashboard/dashboard';
import { AssignTechnicianComponent } from './assign-technician/assign-technician';
import { BillingComponent } from './billing/billing';
import { ManageServicesComponent } from './manage-services/manage-services';
import { UsersComponent } from './users/users';
import { ReportsComponent } from './reports/reports';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'assign-technician', component: AssignTechnicianComponent },
      { path: 'billing', component: BillingComponent },
      { path: 'services', component: ManageServicesComponent },
      { path: 'users', component: UsersComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'reports', component: ReportsComponent }
    ]
  }
];
