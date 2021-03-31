import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { IdeiaComponent } from '../ideia/ideia.component';


export const DashboardRoutes: Routes = [{
  path: '',
  component: DashboardComponent
},
   { path:'post/new', component: IdeiaComponent },
   { path:'post/:id', component: IdeiaComponent, pathMatch: 'full' },
   { path: 'detail/:id', component: DetailComponent }
   
];
