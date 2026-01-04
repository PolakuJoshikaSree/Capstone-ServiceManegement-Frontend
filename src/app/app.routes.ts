import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { RoleGuard } from './core/auth/role-guard';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // ================= ADMIN =================
  {
    path: 'admin',
    canActivate: [RoleGuard],
    data: { role: 'ADMIN' },
    loadChildren: () =>
      import('./features/admin/admin.routes')
        .then(m => m.ADMIN_ROUTES)
  },

  // ================= CUSTOMER =================
  {
    path: 'customer',
    canActivate: [RoleGuard],
    data: { role: 'CUSTOMER' },
    loadChildren: () =>
      import('./features/customer/customer.routes')
        .then(m => m.customerRoutes)
  },

  // ================= TECHNICIAN =================
  {
    path: 'technician',
    canActivate: [RoleGuard],
    data: { role: 'TECHNICIAN' },
    loadChildren: () =>
      import('./features/technician/technician.routes')
        .then(m => m.TECHNICIAN_ROUTES)
  },

  // ================= MANAGER =================
  {
    path: 'manager',
    canActivate: [RoleGuard],
    data: { role: 'MANAGER' },
    loadChildren: () =>
      import('./features/manager/manager.routes')
        .then(m => m.MANAGER_ROUTES)
  },

  { path: '**', redirectTo: 'login' }
];
