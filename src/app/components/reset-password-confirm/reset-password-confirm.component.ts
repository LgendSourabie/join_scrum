import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ModulesService } from '../../services/modules.service';
import { LoginService } from '../login/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password-confirm',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './reset-password-confirm.component.html',
  styleUrl: './reset-password-confirm.component.scss',
})
export class ResetPasswordConfirmComponent implements OnInit {
  new_password: string = '';
  confirm_new_password: string = '';
  uid!: string;
  token!: string;
  resetMessage: string = '';
  resetError: string = '';

  @ViewChild('form') formInput!: NgForm;

  private moduleService = inject(ModulesService);
  private loginService = inject(LoginService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid')!;
    this.token = this.route.snapshot.paramMap.get('token')!;
  }

  onresetConfirm() {
    if (this.formInput.valid) {
      this.loginService
        .handleResetConfirmSubmit({
          uid: this.uid,
          token: this.token,
          ...this.formInput.value,
        })
        .then(() => {
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
