import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditProfileService } from './edit-profile.service';
import { RegisterService } from '../sign-up/register.service';
import { NavBarService } from '../../shared/nav-bar/nav-bar.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent implements OnInit {
  private registerService = inject(RegisterService);
  private navBarService = inject(NavBarService);

  @Input({ required: true }) email: string = '';
  @Input({ required: true }) username: string = '';
  @Input({ required: true }) id!: number;

  edit_profile_state: boolean = false;

  constructor(private editProfileService: EditProfileService) {}

  ngOnInit(): void {
    this.navBarService.open_edit_profile$.subscribe((state) => {
      this.edit_profile_state = state;
    });
  }

  onToggleEditProfile() {
    this.navBarService.emitEditProfileState();
  }

  onEditAccountData() {
    const firstName = this.registerService.getFirstLastName(this.username)[0];
    const lastName = this.registerService.getFirstLastName(this.username)[1];
    console.log('fir', firstName, 'last', lastName);
    const data = { name: `${lastName} ${firstName}` };

    this.editProfileService.handleEditAccount(data, this.id);
  }
}
