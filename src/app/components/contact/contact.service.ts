import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Contact } from '../interfaces/api.interface';
import { BoardService } from '../board/board.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private submenuStateSubject = new BehaviorSubject<boolean>(false);
  open_submenu$ = this.submenuStateSubject.asObservable();

  private selectedContactSubject = new BehaviorSubject<Contact | null>(null);
  selectedContact$ = this.selectedContactSubject.asObservable();

  private addContactSubject = new BehaviorSubject<boolean>(true);
  addContact$ = this.addContactSubject.asObservable();

  private newContactStateSubject = new BehaviorSubject<boolean>(false);
  open_newContact$ = this.newContactStateSubject.asObservable();

  private changeInitialSubject = new BehaviorSubject<boolean>(false);
  initialAlternate$ = this.changeInitialSubject.asObservable();

  private contactErrorSubject = new BehaviorSubject<{
    name: string[] | null | undefined;
    email: string[] | null | undefined;
    telephone: string[] | null | undefined;
  }>({ name: undefined, email: undefined, telephone: undefined });
  errorCreateContact$ = this.contactErrorSubject.asObservable();

  private displayMobileSubject = new BehaviorSubject<
    'contact-list' | 'contact-infos'
  >('contact-list');
  mobileContact$ = this.displayMobileSubject.asObservable();

  private assignContactArraySubject = new BehaviorSubject<Contact[]>([]);
  assignContactArray$ = this.assignContactArraySubject.asObservable();

  newContact: boolean = false;
  token: string | null = null;

  constructor(
    private apiService: ApiService,
    private boardService: BoardService
  ) {}

  async handleCreateContact(contactData: Contact) {
    this.token = sessionStorage.getItem('token');
    if (!this.token) {
      return;
    } else {
      this.apiService
        .postData(
          'contacts/',
          {
            name: contactData.name,
            email: contactData.email,
            telephone: contactData.telephone,
          },

          this.apiService.getAuthHeaders(this.token)
        )
        .subscribe({
          next: () => {
            this.contactErrorSubject.next({
              name: null,
              email: null,
              telephone: null,
            });
          },
          complete: () => {
            this.boardService.getUpdatedData();
          },
          error: (error) => {
            this.contactErrorSubject.next(error.error);
          },
        });
    }
  }
  async handleUpdateContact(contactData: Contact, id: number) {
    this.token = sessionStorage.getItem('token');
    if (!this.token) {
      return;
    } else {
      this.apiService
        .putData(
          'contacts/' + id + '/',
          {
            name: contactData.name,
            email: contactData.email,
            telephone: contactData.telephone,
          },

          this.token
        )
        .subscribe({
          complete: () => {
            this.getUpdatedData().then(() => {
              this.getUpdatedSingleContact(id);
            });
          },
        });
    }
  }

  resetContactError() {
    this.contactErrorSubject.next({
      name: undefined,
      email: undefined,
      telephone: undefined,
    });
  }

  async getUpdatedData() {
    this.token = sessionStorage.getItem('token');
    if (this.token) {
      this.boardService.fetchUserData('accounts/', this.token);
    }
  }

  getUpdatedSingleContact(id: number) {
    this.token = sessionStorage.getItem('token');
    if (this.token) {
      this.apiService.getData('contacts/' + id, this.token).subscribe({
        next: (response) => {
          this.selectedContactSubject.next(response.body);
        },
      });
    }
  }

  emitSubmenuState(value: boolean) {
    this.submenuStateSubject.next(value);
  }

  emitNewContactState(val: boolean) {
    this.newContactStateSubject.next(val);
  }

  emitAddContact(bool: boolean) {
    this.addContactSubject.next(bool);
  }

  emitSelectedContact(contact: Contact | null) {
    this.selectedContactSubject.next(contact);
  }

  emitContactArray(arr: Contact[]) {
    this.assignContactArraySubject.next(arr);
  }

  emitInitialPicture(val: boolean) {
    this.changeInitialSubject.next(val);
  }

  emitHandleView(view: 'contact-list' | 'contact-infos') {
    this.displayMobileSubject.next(view);
  }
}
