import { Component } from '@angular/core';
import { SideNavigationComponent } from '../shared/side-navigation/side-navigation.component';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../shared/nav-bar/nav-bar.component';
import { SubmenuComponent } from '../shared/nav-bar/submenu/submenu.component';
import { SummaryComponent } from '../components/summary/summary.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SideNavigationComponent,
    RouterOutlet,
    NavBarComponent,
    SubmenuComponent,
    SummaryComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
