import { ModulesService } from './../../services/modules.service';
import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BoardService } from '../board/board.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiService = inject(ApiService);
  private boardService = inject(BoardService);
  private moduleService = inject(ModulesService);

  constructor(private router: Router, private route: ActivatedRoute) {}

  async handleLogin(email: string, password: string) {
    this.moduleService.handleLoading(true);
    this.apiService
      .postData(
        'login/',
        {
          email: email,
          password: password,
        },
        this.apiService.getUnAuthHeaders()
      )
      .subscribe({
        next: (response) => {
          if (response.token) {
            this.boardService.fetchUserData('accounts/', response.token);
            sessionStorage.setItem('token', response.token);
            this.onLoginSuccess();
            this.moduleService.onNoError();
          }
        },
        complete: () => {
          this.resetLoading(2500);
        },
        error: (error) => {
          if (error.status === 400 || error.status === 404) {
            this.moduleService.onError(error.error);
            this.resetLoading(0);
            return error.error;
          } else {
            this.moduleService.onError(error.message);
            this.resetLoading(0);
            return error.message;
          }
        },
      });
  }

  onLoginSuccess() {
    const returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || '/dashboard/summary';
    this.router.navigate([returnUrl]);
  }

  handleErrorReset() {
    this.moduleService.onNoError();
  }

  resetLoading(timestamp: number) {
    setTimeout(() => {
      this.moduleService.handleLoading(false);
    }, timestamp);
  }

  async handleResetSubmit(payload: { email: string }) {
    this.apiService
      .postData(
        'password-reset-request/',
        payload,
        this.apiService.getUnAuthHeaders()
      )
      .subscribe({
        next: (response) => {
          this.moduleService.handleResetMessage(response.message);
          this.moduleService.handleResetError('');
        },
        error: (error) => {
          this.moduleService.handleResetError(error.error.email[0]);
          return error.error.email;
        },
      });
  }

  async handleResetConfirmSubmit(payload: {
    uid: string;
    token: string;
    new_password: string;
    confirm_new_password: string;
  }) {
    this.apiService
      .postData(
        'password-reset-confirm/',
        payload,
        this.apiService.getUnAuthHeaders()
      )
      .subscribe({
        next: (response) => {
          this.moduleService.handleResetMessage(response.message);
          this.moduleService.handleResetError('');
        },
        error: (error) => {
          this.moduleService.handleResetError(error.error.error_message[0]);
          return error.error;
        },
      });
  }
}
