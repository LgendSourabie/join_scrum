import { ApiService } from './../../../services/api.service';
import { Component, OnInit, inject } from '@angular/core';
import { ContactNameInitialComponent } from '../shared/contact-name-initial/contact-name-initial.component';
import { DeleteEditButtonComponent } from '../../../shared/delete-edit-button/delete-edit-button.component';
import { ContactService } from '../contact.service';
import { Contact } from '../../interfaces/api.interface';
import { PersonPictureComponent } from '../shared/person-picture/person-picture.component';
import { MobileContactDialogButtonComponent } from '../mobile-contact-dialog-button/mobile-contact-dialog-button.component';

@Component({
  selector: 'app-delete-edit-dialog',
  standalone: true,
  imports: [
    ContactNameInitialComponent,
    DeleteEditButtonComponent,
    MobileContactDialogButtonComponent,
  ],
  templateUrl: './delete-edit-dialog.component.html',
  styleUrl: './delete-edit-dialog.component.scss',
})
export class DeleteEditDialogComponent implements OnInit {
  selectedContact: Contact | null = null;
  oldContact: Contact | null = null;
  token: string | null = null;
  viewName: 'contact-list' | 'contact-infos' = 'contact-list';

  constructor(
    private contactService: ContactService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.contactService.selectedContact$.subscribe((contact) => {
      this.selectedContact = contact;

      if (this.selectedContact !== this.oldContact) {
        this.oldContact = this.selectedContact;
        this.onResetEdit();
      }
    });

    this.contactService.mobileContact$.subscribe((view) => {
      this.viewName = view;
    });
  }

  onViewReset(view: 'contact-list' | 'contact-infos') {
    this.contactService.emitHandleView(view);
  }

  onEdit() {
    const element = document.getElementById('mobile-edit') as HTMLElement;
    if (element) {
      element.classList.add('slideIn');
    }
  }

  onResetEdit() {
    const element = document.getElementById('mobile-edit') as HTMLElement;

    if (element && element.classList.contains('slideIn')) {
      element.classList.remove('slideIn');
    }
  }

  onEditContact() {
    this.contactService.emitNewContactState();
    this.onAddContact(false);
  }

  onAddContact(value: boolean) {
    this.contactService.emitAddContact(value);
  }

  onDeleteContact(id: number) {
    this.token = sessionStorage.getItem('token');

    if (!this.token) {
      return;
    } else {
      this.apiService
        .deleteData('users/contacts/' + id + '/', this.token)
        .subscribe({
          next: () => {
            console.log('contact successfully deleted');
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
}
