import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

export const authGuard: CanActivateFn = (route, state) => {
  const apiService = inject(ApiService);
  const router = inject(Router);

  if (apiService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['dashboard/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
};
