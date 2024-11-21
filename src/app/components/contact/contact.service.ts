import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Contact } from '../interfaces/api.interface';

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

  private displayMobileSubject = new BehaviorSubject<
    'contact-list' | 'contact-infos'
  >('contact-list');
  mobileContact$ = this.displayMobileSubject.asObservable();

  private assignContactArraySubject = new BehaviorSubject<Contact[]>([]);
  assignContactArray$ = this.assignContactArraySubject.asObservable();

  newContact: boolean = false;
  token: string | null = null;

  constructor(private apiService: ApiService) {}

  handleCreateContact(contactData: Contact) {
    this.token = sessionStorage.getItem('token');
    if (!this.token) {
      return;
    } else {
      this.apiService
        .postData(
          'users/contacts/',
          {
            name: contactData.name,
            email: contactData.email,
            telephone: contactData.telephone,
          },

          this.apiService.getAuthHeaders(this.token)
        )
        .subscribe((response) => {});
    }
  }
  handleUpdateContact(contactData: Contact, id: number) {
    this.token = sessionStorage.getItem('token');
    if (!this.token) {
      return;
    } else {
      this.apiService
        .putData(
          'users/contacts/' + id + '/',
          {
            name: contactData.name,
            email: contactData.email,
            telephone: contactData.telephone,
          },

          this.token
        )
        .subscribe((response) => {});
    }
  }

  emitSubmenuState(value: boolean) {
    this.submenuStateSubject.next(value);
  }

  emitNewContactState() {
    this.newContact = !this.newContact;
    this.newContactStateSubject.next(this.newContact);
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
