import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { User } from '../components/interfaces/api.interface';

@Injectable({
  providedIn: 'root',
})
export class ModulesService {
  private userDataSubject = new BehaviorSubject<User[]>([]);
  userData$ = this.userDataSubject.asObservable();

  private isLoadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string>('');
  error$ = this.errorSubject.asObservable();

  private errorSubjectLogin = new BehaviorSubject<{
    error_type: string[] | null[];
    error_message: string[] | null[];
  }>({ error_type: [null], error_message: [null] });
  loginError$ = this.errorSubjectLogin.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);

  isLoadingLogin$ = this.loadingSubject.asObservable();

  private resetMessageSubject = new BehaviorSubject<string>('');

  resetMessage$ = this.resetMessageSubject.asObservable();

  private resetErrorSubject = new BehaviorSubject<string>('');

  resetError$ = this.resetErrorSubject.asObservable();

  constructor(private location: Location, private router: Router) {}

  getNameInitials(name: string) {
    let nameArray = name?.split(' ');
    let firstName = nameArray?.pop();
    let lastName = nameArray?.join(' ');

    let firstLetter = firstName ? firstName[0]?.toUpperCase() : '';
    let lastLetter = lastName ? lastName[0]?.toUpperCase() : '';
    return `${lastLetter}${firstLetter}`;
  }

  handleReturn(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigateByUrl('dashboard/summary');
    }
  }

  emitAccountData(data: any) {
    this.userDataSubject.next(data);
  }

  emitFetchError(error: any) {
    this.errorSubject.next(error);
  }
  emitLoading(bool: boolean) {
    this.isLoadingSubject.next(bool);
  }

  onNoError() {
    this.errorSubjectLogin.next({ error_type: [null], error_message: [null] });
  }
  onError(error: any) {
    this.errorSubjectLogin.next(error);
  }

  handleLoading(bool: boolean) {
    this.loadingSubject.next(bool);
  }

  handleResetMessage(message: string) {
    this.resetMessageSubject.next(message);
  }

  handleResetError(error: string) {
    this.resetErrorSubject.next(error);
  }
}
