import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed.component';
import { RouterModule } from '@angular/router';
import { routes } from './feed-routing.module';
import { MatCardModule, MatListModule } from '@angular/material';
import { FeedService } from './feed.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatListModule
  ],
  declarations: [
    FeedComponent
  ],
  providers:[FeedService]
})
export class FeedModule { }
