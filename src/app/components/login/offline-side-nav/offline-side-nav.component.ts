import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../../dashboard/dashboard.service';

@Component({
  selector: 'app-offline-side-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './offline-side-nav.component.html',
  styleUrl: './offline-side-nav.component.scss',
})
export class OfflineSideNavComponent {
  chosenMenu: string = 'offline-privacy-policy';

  constructor(private dashboardService: DashboardService) {
    this.dashboardService.chosenMenu$.subscribe((menu) => {
      this.chosenMenu = menu;
    });
  }

  handleIndex(chosenMenu: string) {
    this.dashboardService.emitChosen(chosenMenu);
  }
}
