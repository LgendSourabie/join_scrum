import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { RouterLink, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import { DashboardService } from '../../dashboard/dashboard.service';

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
  loginError: {
    error_type: string[] | null;
    error_message: string[] | null;
  } = { error_type: null, error_message: null };

  @ViewChild('email') emailInput!: NgModel;
  @ViewChild('password') pwdInput!: NgModel;

  loginData = {
    email: '',
    password: '',
    checkbox: false,
  };

  constructor(
    private loginService: LoginService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.handleResetData();
    this.loginService.loginError$.subscribe((value) => {
      this.loginError = value;
      console.log('ERR', value);
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

  onresetValidation() {
    this.loginService.handleErrorReset();
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
