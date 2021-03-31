import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingComponent } from './ranking.component';
import { RouterModule } from '@angular/router';
import { routes } from './ranking.router-module';
import { MatTableModule, MatFormFieldModule, MatFormFieldControl } from '@angular/material';
import { IdeiaService } from '../ideia/shared/ideia.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    
    

  ],
  declarations: [RankingComponent,],
  providers:[IdeiaService]
})
export class RankingModule { }
