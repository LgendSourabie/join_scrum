import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RegisterService } from '../sign-up/register.service';

@Injectable({
  providedIn: 'root',
})
export class EditProfileService {
  private apiService = inject(ApiService);
  private registerService = inject(RegisterService);
  token: string | null = null;
  constructor() {}

  handleEditAccount(data: any, id: number) {
    const firstName = this.registerService.getFirstLastName(data.name)[0];
    const lastName = this.registerService.getFirstLastName(data.name)[1];

    this.token = sessionStorage.getItem('token');
    if (!this.token) {
      return;
    } else {
      this.apiService
        .patchData(
          'users/accounts/' + id + '/',
          {
            first_name: firstName,
            last_name: lastName,
            email: data.email,
          },
          this.token
        )
        .subscribe((response) => {});
    }
  }
}
