import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isPasswordFocused: boolean = false;
  isEmailFocused: boolean = false;
  isFormEmpty!: boolean;
  isFormFieldNull!: boolean;

  loginData = {
    email: '',
    password: '',
    checkbox: false,
  };

  isFormValid(): boolean {
    this.isFormEmpty =
      !this.loginData.checkbox ||
      this.loginData.password == '' ||
      this.loginData.email == '';

    this.isFormFieldNull =
      this.loginData.checkbox == null ||
      this.loginData.password == null ||
      this.loginData.email == null;

    return this.isFormEmpty || this.isFormFieldNull;
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

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      console.log('You log in');

      // this.http.post(this.post.endPoint, this.post.body(this.contactData)).subscribe({
      //   next: response => {
      //     ngForm.resetForm();
      //   },
      //   error: error => {
      //     this.errorToast();
      //   },
      //   complete: () => this.successToast(),
      // });
    }
  }
}
