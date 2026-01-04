import { Routes } from '@angular/router';
import { TechnicianLayoutComponent } from './technician-layout/technician-layout';
import { TaskListComponent } from './task-list/task-list';
import { UpdateStatusComponent } from './update-status/update-status';

export const TECHNICIAN_ROUTES: Routes = [
  {
    path: '',
    component: TechnicianLayoutComponent,
    children: [
      {
        path: 'tasks',
        component: TaskListComponent
      },
      {
        path: 'update-status/:bookingId',
        component: UpdateStatusComponent
      },
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
      }
    ]
  }
];
