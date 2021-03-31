import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquipeComponent } from './equipe.component';
import { TaskboardComponent } from './taskboard/taskboard.component';

const routes: Routes = [
  { path:'', component: EquipeComponent },
  { path: ':id', component: TaskboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipeRoutingModule { }
