import { ModulesService } from './../../services/modules.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { LoginService } from './login.service';
import { DashboardService } from '../../dashboard/dashboard.service';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';
import { RegisterService } from '../sign-up/register.service';
import { GuestService } from '../../services/guest.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  isPasswordFocused: boolean = false;
  isEmailFocused: boolean = false;
  isFormEmpty!: boolean;
  isFormFieldNull!: boolean;
  pwdVisibility: boolean = false;
  pwdIconPathVisible: string = 'visibility_off.svg';
  pwdType: string = 'password';
  checkedIcon: string = 'checkboxUncheck.svg';
  isLoading: boolean = false;
  loginError: {
    error_type: string[] | null[];
    error_message: string[] | null[];
  } = { error_type: [null], error_message: [null] };

  @ViewChild('email') emailInput!: NgModel;
  @ViewChild('password') pwdInput!: NgModel;

  private moduleService = inject(ModulesService);
  private guestService = inject(GuestService);

  loginData = {
    email: '',
    password: '',
    checkbox: false,
  };

  constructor(
    private loginService: LoginService,
    private apiService: ApiService,
    private dashboardService: DashboardService,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.handleResetData();
    this.moduleService.loginError$.subscribe((value) => {
      this.loginError = value;
    });

    this.moduleService.isLoadingLogin$.subscribe((state) => {
      this.isLoading = state;
    });
  }

  onPasswordFocus() {
    this.isPasswordFocused = true;
  }
  onEmailFocus() {
    this.isEmailFocused = true;
  }

  onPasswordBlur() {
    if (!this.loginData.password) {
      this.isPasswordFocused = false;
    }
  }
  onEmailBlur() {
    if (!this.loginData.email) {
      this.isEmailFocused = false;
    }
  }

  handleVisibility() {
    if (this.loginData.password) {
      this.pwdVisibility = true;
    } else {
      this.pwdVisibility = false;
      this.pwdIconPathVisible = 'visibility_off.svg';
    }
  }

  onShowPwd() {
    if (this.pwdVisibility) {
      if (this.pwdIconPathVisible === 'visibility_off.svg') {
        this.pwdIconPathVisible = 'visibility.svg';
        this.pwdType = 'text';
      } else {
        this.pwdIconPathVisible = 'visibility_off.svg';
        this.pwdType = 'password';
      }
    }
  }

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      this.loginService
        .handleLogin(this.loginData.email, this.loginData.password)
        .then((error) => {
          if (error === null) {
            this.handleResetData();
          }
        });
    }
  }

  onGuestLogin() {
    this.guestService.handleGuestLogin();
  }

  onresetValidation() {
    this.moduleService.onNoError();
  }

  handleResetData() {
    this.loginData.email = '';
    this.loginData.password = '';
    this.checkedIcon = 'checkboxUncheck.svg';
    this.pwdIconPathVisible = 'visibility_off.svg';
  }

  handleIndex(chosenMenu: string) {
    this.dashboardService.emitChosen(chosenMenu);
  }

  handleRememberMe() {
    if (this.checkedIcon === 'checkboxUncheck.svg') {
      this.checkedIcon = 'checkboxChecked.svg';
    } else {
      this.checkedIcon = 'checkboxUncheck.svg';
    }
  }

  onRememberMe() {
    return 'assets/icons/' + this.checkedIcon;
  }
}
