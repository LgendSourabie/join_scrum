import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Registration } from './singup.interface';
import { FormsModule, NgForm } from '@angular/forms';
import { RegisterService } from './register.service';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  pwdVisibility: boolean = false;
  pwdIconPathVisible: string = 'visibility_off.svg';
  pwdType: string = 'password';
  confirmPwdVisibility: boolean = false;
  confirmPwdIconPathVisible: string = 'visibility_off.svg';
  confirmPwdType: string = 'password';
  togglePolicy: boolean = false;
  errorSignUp: {
    error_type: string[] | null;
    error_message: string[] | null;
  } = { error_type: null, error_message: null };

  registerData: Registration = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  };

  constructor(private registerService: RegisterService) {}

  ngOnInit(): void {
    this.registerService.errorSignUp$.subscribe((values) => {
      this.errorSignUp = values;
    });
  }

  handleVisibility(field: string, input: string) {
    if (input === 'password') {
      this, this.handlePwdVisible(field);
    } else if (input === 'confirm_pwd') {
      this.handleConfirmPwdVisible(field);
    }
  }

  onTogglePolicy() {
    this.togglePolicy = !this.togglePolicy;
  }

  handlePwdVisible(param: string) {
    if (param) {
      this.pwdVisibility = true;
    } else {
      this.pwdVisibility = false;
      this.pwdIconPathVisible = 'visibility_off.svg';
    }
  }

  handleConfirmPwdVisible(param: string) {
    if (param) {
      this.confirmPwdVisibility = true;
    } else {
      this.confirmPwdVisibility = false;
      this.confirmPwdIconPathVisible = 'visibility_off.svg';
    }
  }

  onShowPwd(input: string) {
    if (input === 'password') {
      this.handlePwdShow();
    } else if (input === 'confirm_pwd') {
      this.handleConfirmPwdShow();
    }
  }

  handlePwdShow() {
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

  handleConfirmPwdShow() {
    if (this.confirmPwdVisibility) {
      if (this.confirmPwdIconPathVisible === 'visibility_off.svg') {
        this.confirmPwdIconPathVisible = 'visibility.svg';
        this.confirmPwdType = 'text';
      } else {
        this.confirmPwdIconPathVisible = 'visibility_off.svg';
        this.confirmPwdType = 'password';
      }
    }
  }

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      this.registerService.handleRegister(this.registerData).then((error) => {
        if (error !== undefined) {
          ngForm.resetForm();
        }
      });
    }
  }

  handleIndex(chosenMenu: string) {
    this.dashboardService.emitChosen(chosenMenu);
  }
}
