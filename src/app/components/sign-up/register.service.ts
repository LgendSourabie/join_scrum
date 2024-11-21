import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Registration } from './singup.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private errorSignUpSubject = new BehaviorSubject<{
    error_type: string[] | null;
    error_message: string[] | null;
  }>({ error_type: null, error_message: null });

  errorSignUp$ = this.errorSignUpSubject.asObservable();

  constructor(private apiService: ApiService) {}

  async handleRegister(data: Registration) {
    const firstName = this.getFirstLastName(data.name)[0];
    const lastName = this.getFirstLastName(data.name)[1];

    this.apiService
      .postData(
        'accounts/registration/',
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
        next: () => {
          this.errorSignUpSubject.next({
            error_type: null,
            error_message: null,
          });
        },
        error: (error) => {
          if (error.status === 400) {
            console.log('error', error.error);
            this.errorSignUpSubject.next(error.error);
            return error.error;
          } else if (error.status === 404) {
            this.errorSignUpSubject.next(error.message);
            return error.message;
          }
        },
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
