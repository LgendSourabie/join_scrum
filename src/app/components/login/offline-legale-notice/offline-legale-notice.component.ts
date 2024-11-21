import { Component } from '@angular/core';
import { OfflineSideNavComponent } from '../offline-side-nav/offline-side-nav.component';
import { OfflineNavBarComponent } from '../offline-nav-bar/offline-nav-bar.component';
import { LegalNoticeComponent } from '../../legal-notice/legal-notice.component';
import { ModulesService } from '../../../services/modules.service';

@Component({
  selector: 'app-offline-legale-notice',
  standalone: true,
  imports: [
    OfflineSideNavComponent,
    OfflineNavBarComponent,
    LegalNoticeComponent,
  ],
  templateUrl: './offline-legale-notice.component.html',
  styleUrl: './offline-legale-notice.component.scss',
})
export class OfflineLegaleNoticeComponent {
  constructor(private moduleService: ModulesService) {}

  onReturn() {
    this.moduleService.handleReturn();
  }
}
