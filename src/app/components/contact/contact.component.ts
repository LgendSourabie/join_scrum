import { Component } from '@angular/core';
import { EditOrAddContactComponent } from './edit-or-add-contact/edit-or-add-contact.component';
import { DeleteEditDialogComponent } from './delete-edit-dialog/delete-edit-dialog.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { BetterWithTeamComponent } from '../../shared/better-with-team/better-with-team.component';
import { ContactService } from './contact.service';
import { CommonModule } from '@angular/common';
import { Contact } from '../interfaces/api.interface';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    EditOrAddContactComponent,
    DeleteEditDialogComponent,
    ContactListComponent,
    BetterWithTeamComponent,
    CommonModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  edit_contact: boolean = false;
  newContact: boolean = false;
  selectedContact: Contact | null = null;
  oldContact: Contact | null = null;
  viewName: 'contact-list' | 'contact-infos' = 'contact-list';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.open_submenu$.subscribe((state) => {
      this.edit_contact = state;
    });

    this.contactService.mobileContact$.subscribe((view) => {
      this.viewName = view;
    });

    this.contactService.selectedContact$.subscribe((contact) => {
      this.selectedContact = contact;

      if (this.selectedContact !== this.oldContact) {
        this.oldContact = this.selectedContact;
        this.openAddContact();
      }
    });

    this.contactService.open_newContact$.subscribe((state) => {
      this.newContact = state;
    });

    this.contactService.emitHandleView('contact-list');
  }

  openAddContact() {
    const element = document.getElementById('edit-contact') as HTMLElement;

    if (element && !element.classList.contains('slideIn')) {
      element.classList.add('slideIn');
    } else if (element && element.classList.contains('slideIn')) {
      element.classList.remove('slideIn');

      setTimeout(() => {
        element.classList.add('slideIn');
      }, 50);
    }
  }

  resetSlideIn() {
    const element = document.getElementById('edit-contact') as HTMLElement;

    if (element && element.classList.contains('slideIn')) {
      element.classList.remove('slideIn');
    }
  }
}
