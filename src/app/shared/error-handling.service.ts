import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  private errorSignUpSubject = new BehaviorSubject<{
    error_type: string[] | null[] | undefined;
    error_message: string[] | null[] | undefined;
  }>({ error_type: undefined, error_message: undefined });

  errorSignUp$ = this.errorSignUpSubject.asObservable();

  constructor() {}

  emitError(value: any) {
    this.errorSignUpSubject.next(value);
  }
}
