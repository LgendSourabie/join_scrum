import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Registration } from './singup.interface';
import { FormsModule, NgForm } from '@angular/forms';
import { RegisterService } from './register.service';
import { DashboardService } from '../../dashboard/dashboard.service';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { ErrorHandlingService } from '../../shared/error-handling.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, FormsModule, ConfirmationDialogComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  private dashboardService = inject(DashboardService);
  private errorHandlingService = inject(ErrorHandlingService);

  pwdVisibility: boolean = false;
  pwdIconPathVisible: string = 'visibility_off.svg';
  pwdType: string = 'password';
  confirmPwdVisibility: boolean = false;
  confirmPwdIconPathVisible: string = 'visibility_off.svg';
  confirmPwdType: string = 'password';
  togglePolicy: boolean = false;
  errorSignUp: {
    error_type: string[] | null[] | undefined;
    error_message: string[] | null[] | undefined;
  } = { error_type: undefined, error_message: undefined };

  registerData: Registration = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  };

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

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
    const element = document.getElementById('sign-up-success') as HTMLElement;

    if (ngForm.submitted && ngForm.form.valid) {
      this.registerService.handleRegister(this.registerData).then(() => {
        this.errorHandlingService.errorSignUp$.subscribe((error) => {
          this.errorSignUp = error;
          if (this.errorSignUp.error_message !== undefined) {
            if (!error.error_message || !error.error_message[0]) {
              ngForm.resetForm();
              this.confirmSignUp(element);
              this.returnToLogin(element);
            }
          }
        });
      });
    }
  }

  confirmSignUp(element: HTMLElement) {
    if (element) {
      element.classList.add('slideIn');
    }
  }

  returnToLogin(element: HTMLElement) {
    setTimeout(() => {
      if (element) {
        element.classList.remove('slideIn');
        this.router.navigateByUrl('account/log-in');
      }
    }, 1000);
  }

  handleIndex(chosenMenu: string) {
    this.dashboardService.emitChosen(chosenMenu);
  }
}
