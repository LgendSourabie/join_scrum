import { Component, inject, OnInit } from '@angular/core';
import { ModulesService } from '../../services/modules.service';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss',
})
export class LegalNoticeComponent {
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
