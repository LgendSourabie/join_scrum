import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private chosenMenuSubject = new BehaviorSubject<string>('summary');
  chosenMenu$ = this.chosenMenuSubject.asObservable();
  private previousChosenMenu$: string | null = null;

  private currentUrlSubject = new BehaviorSubject<string>('');
  currentUrl$ = this.currentUrlSubject.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.currentUrlSubject.next(event.urlAfterRedirects.split('/').pop()!);
      });
  }

  emitChosen(chosenMenu: string) {
    this.previousChosenMenu$ = this.chosenMenuSubject.value;
    this.chosenMenuSubject.next(chosenMenu);
  }

  emitPreviousChosen() {
    if (this.previousChosenMenu$ !== null) {
      this.chosenMenuSubject.next(this.previousChosenMenu$);
    }
  }
}
