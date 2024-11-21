import { Component, inject } from '@angular/core';
import { ModulesService } from '../../services/modules.service';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
})
export class PrivacyPolicyComponent {
  private dashboardService = inject(DashboardService);

  constructor(private moduleService: ModulesService) {}

  onReturn() {
    this.moduleService.handleReturn();
    this.highlightPreviousMenu();
  }

  highlightPreviousMenu() {
    this.dashboardService.emitPreviousChosen();
  }
}
