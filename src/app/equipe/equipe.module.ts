import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipeRoutingModule } from './equipe-routing.module';
import { EquipeComponent } from './equipe.component';
import { MatSidenavModule, MatCardModule, MatToolbarModule, MatTabsModule, MatIconModule, MatTooltipModule, MatButtonModule, MatButtonToggleModule, MatListModule, MatSliderModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatGridListModule, MatDividerModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSelectModule} from '@angular/material/select';
import { DragulaModule } from 'ng2-dragula';
import { TaskboardComponent } from './taskboard/taskboard.component';
import { QuadroComponent } from './taskboard/dialogs/quadro.component';
import { CardComponent } from './taskboard/dialogs/card.component';
import { EquipeService } from './equipe.service';
import { UserService } from '../auth/signin/shared/user.service';
import { DeleteComponent } from '../core/dialogs/delete.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { TaskBoardService } from './taskboard/taskboard.service';
import { StorageService } from '../config/storage.service';

@NgModule({
  imports: [
    CommonModule,
    EquipeRoutingModule,
    MatSidenavModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSidenavModule,
    FormsModule,
    FlexLayoutModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    DragulaModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    DashboardModule
  ],
  declarations: [
    EquipeComponent,
    TaskboardComponent,
    QuadroComponent,
    CardComponent
  ],
  entryComponents:[
    QuadroComponent,
    CardComponent,
    DeleteComponent
  ],
  providers:[EquipeService, UserService, TaskBoardService]
})
export class EquipeModule { }
