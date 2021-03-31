import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routes } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { EditComponent } from './edit/edit.component';
import { MatToolbarModule, MatIconModule, MatCardModule, MatButtonModule, MatListModule, MatProgressBarModule, MatMenuModule, MatTabsModule, MatInputModule, MatOptionModule, MatSelectModule, MatSlideToggleModule, MatGridListModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StorageService } from '../config/storage.service';
import { PerfilService } from './perfil.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
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
    ReactiveFormsModule,
    MatGridListModule,
    MatDialogModule,
    MatSnackBarModule
   
    
  ],
  declarations: [
    ProfileComponent,
    EditComponent
  ],
  entryComponents:[EditComponent],
  providers:[StorageService, PerfilService]
})
export class ProfileModule { }
