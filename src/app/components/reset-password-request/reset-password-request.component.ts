import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { ModulesService } from '../../services/modules.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-reset-password-request',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './reset-password-request.component.html',
  styleUrl: './reset-password-request.component.scss',
})
export class ResetPasswordRequestComponent {
  email: string = '';
  resetMessage: string = '';
  resetError: string = '';

  private moduleService = inject(ModulesService);
  private loginService = inject(LoginService);

  @ViewChild('form') formInput!: NgForm;

  constructor(private apiService: ApiService) {}

  onSubmit() {
    if (this.formInput.valid) {
      this.loginService.handleResetSubmit(this.formInput.value).then(() => {
        this.moduleService.resetMessage$.subscribe((message) => {
          this.resetMessage = message;
        });
        this.moduleService.resetError$.subscribe((error) => {
          this.resetError = error;
        });
      });
    }
  }
}
