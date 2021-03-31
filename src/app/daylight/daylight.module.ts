import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DaylightRoutingModule } from './daylight-routing.module';
import { DaylightComponent } from './daylight.component';
import { MatGridListModule, MatCardModule, MatButtonModule, MatButtonToggleModule, MatIconModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    DaylightRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule
  ],
  declarations: [
    DaylightComponent,
  ]
})
export class DaylightModule { }
