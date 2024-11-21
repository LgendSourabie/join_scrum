import { Component, inject, Input, OnInit } from '@angular/core';
import { User } from '../interfaces/api.interface';
import { ModulesService } from '../../services/modules.service';
import { NavBarService } from '../../shared/nav-bar/nav-bar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private navBarService = inject(NavBarService);
  @Input() accountData: User[] = [];
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  profile_state: boolean = false;

  constructor(private moduleService: ModulesService) {}

  ngOnInit(): void {
    this.navBarService.open_profile$.subscribe((state) => {
      this.profile_state = state;
    });
  }

  getAccountInfos() {
    this.firstName = this.accountData[0]?.first_name;
    this.lastName = this.accountData[0]?.last_name;
    this.email = this.accountData[0]?.email;
    return [this.firstName, this.lastName, this.email];
  }

  onToggleEditProfile() {
    this.navBarService.emitEditProfileState();
  }

  onToggleProfile() {
    this.navBarService.emitProfileState();
  }

  getNameInitials() {
    let name;
    if (this.accountData.length === 0) {
      name = 'Guest';
    } else if (this.accountData.length === 1) {
      name = `${this.accountData[0]?.first_name} ${
        this.accountData[0]?.last_name ? this.accountData[0]?.last_name[0] : ''
      }`;
    } else {
      name = 'Host';
    }
    return this.moduleService.getNameInitials(name);
  }
}
