import { Component, OnInit } from '@angular/core';
import { SideNavigationComponent } from '../shared/side-navigation/side-navigation.component';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../shared/nav-bar/nav-bar.component';
import { SubmenuComponent } from '../shared/nav-bar/submenu/submenu.component';
import { SummaryComponent } from '../components/summary/summary.component';
import { NavBarService } from '../shared/nav-bar/nav-bar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SideNavigationComponent,
    RouterOutlet,
    NavBarComponent,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  submenu_state: boolean = false;
  profile_state: boolean = false;
  edit_profile_state: boolean = false;

  constructor(private navBarService: NavBarService) {}

  ngOnInit(): void {
    this.navBarService.open_submenu$.subscribe((state) => {
      this.submenu_state = state;
    });
    this.navBarService.open_profile$.subscribe((state) => {
      this.profile_state = state;
    });
    this.navBarService.open_edit_profile$.subscribe((state) => {
      this.edit_profile_state = state;
    });
  }

  onCloseSubMenu() {
    this.navBarService.emitSubmenuState();
  }

  onCloseProfile() {
    this.navBarService.emitProfileState();
  }

  onCloseEditProfile() {
    this.navBarService.emitEditProfileState();
  }
}
