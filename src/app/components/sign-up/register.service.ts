import { ErrorHandlingService } from './../../shared/error-handling.service';
import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Registration } from './singup.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private errorHandlingService = inject(ErrorHandlingService);

  constructor(private apiService: ApiService) {}

  async handleRegister(data: Registration) {
    const firstName = this.getFirstLastName(data.name)[0];
    const lastName = this.getFirstLastName(data.name)[1];

    this.apiService
      .postData(
        'register/',
        {
          first_name: firstName,
          last_name: lastName || '',
          email: data.email,
          password: data.password,
          confirm_password: data.confirm_password,
        },
        this.apiService.getUnAuthHeaders()
      )
      .subscribe({
        next: (response) => {
          this.handleResetSignUpError();
        },
        error: (error) => {
          this.errorHandlingService.emitError(error.error);
          return error.error;
        },
      });
  }

  handleResetSignUpError() {
    this.errorHandlingService.emitError({
      error_type: [null],
      error_message: [null],
    });
  }

  getFirstLastName(name: string) {
    let firstName;
    let lastName;
    let nameArray;
    if (name?.includes(' ')) {
      nameArray = name.split(' ');
      firstName = nameArray.pop();
      lastName = nameArray.join(' ');
    } else {
      lastName = '';
      firstName = name;
    }
    return [firstName, lastName];
  }
}
