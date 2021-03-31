import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatCardModule, MatButtonModule, MatListModule, MatProgressBarModule, MatMenuModule, MatTabGroup, MatTabsModule, MatFormFieldControl, MatToolbarModule, MatInputModule, MatOptionModule, MatSelect, MatSelectModule, MatSlideToggle, MatSlideToggleModule, MatDatepicker, MatDatepickerModule, MatNativeDateModule, MatStepperModule, MatStepLabel, MatHorizontalStepper, MatStep, MatGridListModule, MatGridList, MatCheckboxModule, MatSnackBar, MatSnackBarModule, MatDialogModule, MatChipsModule, MatExpansionModule, MatTooltipModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { DetailComponent } from './detail/detail.component';
import { IdeiaComponent } from '../ideia/ideia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteComponent } from '../core/dialogs/delete.component';
import { StorageService } from '../config/storage.service';
import { FilterPipe } from './filter.pipe';
import { SharedComponent } from './dialogs/shared.component';
import { FeedService } from '../feed/feed.service';
import { BancoComponent } from './dialogs/banco.component';
import { CurrencyMaskModule } from "ng2-currency-mask";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatMenuModule,
    FlexLayoutModule,
    MatTabsModule,
    MatToolbarModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule,
    FormsModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressBarModule,
    MatChipsModule,
    MatExpansionModule,
    MatTooltipModule,
    CurrencyMaskModule
   
  ],

  entryComponents: [
    DeleteComponent,
    SharedComponent,
    BancoComponent
  ],
  providers:[StorageService, FeedService],
  exports:[DeleteComponent],
  
  declarations: [DashboardComponent, DetailComponent, BancoComponent, IdeiaComponent, DeleteComponent,SharedComponent, FilterPipe]
})

export class DashboardModule {}
