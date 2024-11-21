import { Component } from '@angular/core';
import { OfflineSideNavComponent } from '../offline-side-nav/offline-side-nav.component';
import { OfflineNavBarComponent } from '../offline-nav-bar/offline-nav-bar.component';
import { PrivacyPolicyComponent } from '../../privacy-policy/privacy-policy.component';
import { ModulesService } from '../../../services/modules.service';

@Component({
  selector: 'app-offline-privacy-policy',
  standalone: true,
  imports: [
    OfflineSideNavComponent,
    OfflineNavBarComponent,
    PrivacyPolicyComponent,
  ],
  templateUrl: './offline-privacy-policy.component.html',
  styleUrl: './offline-privacy-policy.component.scss',
})
export class OfflinePrivacyPolicyComponent {
  constructor(private moduleService: ModulesService) {}

  onReturn() {
    this.moduleService.handleReturn();
  }
}
