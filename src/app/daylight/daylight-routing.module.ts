import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DaylightComponent } from './daylight.component';

const routes: Routes = [
     { path:'', component: DaylightComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DaylightRoutingModule { }
