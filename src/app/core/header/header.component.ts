import { Component, EventEmitter, Output } from '@angular/core';

import * as screenfull from 'screenfull';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { IdeiaService } from 'src/app/ideia/shared/ideia.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
  
})
export class HeaderComponent {
  search: string = 'ops';
  valor: string;
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleNotificationSidenav = new EventEmitter<void>();
  @Output() textFilter = new EventEmitter();
  constructor(private service: IdeiaService) {
  }

  press(){
    this.service.search(this.valor);
  }

  fullScreenToggle(): void {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }
}
