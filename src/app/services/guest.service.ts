import { inject, Injectable } from '@angular/core';
import { RegisterService } from '../components/sign-up/register.service';
import { ModulesService } from './modules.service';
import { ApiService } from './api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlingService } from '../shared/error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  private moduleService = inject(ModulesService);
  private errorHandlingService = inject(ErrorHandlingService);

  private URL = 'http://localhost:8000/api/';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  handleGuestLogin() {
    this.moduleService.handleLoading(true);

    this.apiService
      .postData('guest-login/', '', this.apiService.getUnAuthHeaders())
      .subscribe({
        next: (response) => {
          if (response.token) {
            this.fetchAccountData('accounts/', response.token);
            sessionStorage.setItem('token', response.token);
            this.onLoginSuccess();
            this.moduleService.onNoError();
          }
        },
        complete: () => {
          setTimeout(() => {
            this.moduleService.handleLoading(false);
          }, 2500);
        },
        error: (error) => {
          if (error.status === 400) {
            this.moduleService.onError(error.error);
            return error.error;
          } else {
            this.moduleService.onError(error.error);
            return error.message;
          }
        },
      });
  }

  fetchAccountData(endpoint: string, token: string) {
    this.moduleService.emitLoading(true);
    this.apiService.getData(endpoint, token).subscribe({
      next: (response) => {
        this.moduleService.emitAccountData(response.body);
      },
      error: (error) => {
        this.moduleService.emitFetchError(error.message);
      },
      complete: () => {
        this.moduleService.emitLoading(false);
      },
    });
  }

  onLoginSuccess() {
    const returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || '/dashboard/summary';
    this.router.navigate([returnUrl]);
  }
}
