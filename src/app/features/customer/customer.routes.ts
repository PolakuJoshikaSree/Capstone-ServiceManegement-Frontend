import { Routes } from '@angular/router';

import { CustomerLayoutComponent } from './layout/customer-layout';
import { ServiceCatalogComponent } from './service-catalog/service-catalog';
import { MyServicesComponent } from './my-services/my-services';
import { CreateBookingComponent } from './create-booking/create-booking';
import { ServiceDetailsComponent } from './service-details/service-details';
import { InvoicesComponent } from './invoices/invoices';
import { NotificationComponent } from './notifications/notifications';

export const customerRoutes: Routes = [
  {
    path: '',
    component: CustomerLayoutComponent,
    children: [
      { path: 'services', component: ServiceCatalogComponent },
      { path: 'my-services', component: MyServicesComponent },
      { path: 'create-booking', component: CreateBookingComponent },
      { path: 'service/:id', component: ServiceDetailsComponent },
      { path: 'invoices', component: InvoicesComponent },

      { path: 'notifications', component: NotificationComponent },

      { path: '', redirectTo: 'services', pathMatch: 'full' }
    ]
  }
];
