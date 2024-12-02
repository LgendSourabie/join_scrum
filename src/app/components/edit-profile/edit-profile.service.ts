import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RegisterService } from '../sign-up/register.service';
import { BoardService } from '../board/board.service';

@Injectable({
  providedIn: 'root',
})
export class EditProfileService {
  private apiService = inject(ApiService);
  private registerService = inject(RegisterService);
  token: string | null = null;
  constructor(private boardService: BoardService) {}

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
            first_name: firstName?.trim(),
            last_name: lastName,
            email: data.email,
          },
          this.token
        )
        .subscribe({
          complete: () => {
            this.getUpdatedData();
          },
        });
    }
  }

  getUpdatedData() {
    this.token = sessionStorage.getItem('token');
    if (this.token) {
      this.boardService.fetchUserData('accounts/', this.token);
    }
  }
}
