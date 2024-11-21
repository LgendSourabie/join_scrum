import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavBarService } from '../nav-bar.service';

@Component({
  selector: 'app-submenu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './submenu.component.html',
  styleUrl: './submenu.component.scss',
})
export class SubmenuComponent {
  submenu_state: boolean = false;

  constructor(private navBarService: NavBarService) {}

  ngOnInit(): void {
    this.navBarService.open_submenu$.subscribe((state) => {
      this.submenu_state = state;
    });
  }

  onToggleProfile() {
    this.navBarService.emitProfileState();
  }

  onToggleSubMenu() {
    this.navBarService.emitSubmenuState();
  }
  onLogout() {
    this.navBarService.closeSubmenu();
    sessionStorage.removeItem('token');
  }
}
