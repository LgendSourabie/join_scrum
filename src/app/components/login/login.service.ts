import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BoardService } from '../board/board.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private errorSubject = new BehaviorSubject<{
    error_type: string[] | null;
    error_message: string[] | null;
  }>({ error_type: null, error_message: null });
  loginError$ = this.errorSubject.asObservable();
  private apiService = inject(ApiService);
  private boardService = inject(BoardService);

  constructor(private router: Router, private route: ActivatedRoute) {}

  async handleLogin(email: string, password: string) {
    this.apiService
      .postData(
        'accounts/login/',
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
            this.errorSubject.next({ error_type: null, error_message: null });
          }
        },
        complete: () => {
          // console.log('You are logged in');
        },
        error: (error) => {
          if (error.status === 400) {
            console.log(error.error);

            this.errorSubject.next(error.error);
            return error.error;
          } else {
            this.errorSubject.next(error.message);
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
    this.errorSubject.next({ error_type: null, error_message: null });
  }
}
