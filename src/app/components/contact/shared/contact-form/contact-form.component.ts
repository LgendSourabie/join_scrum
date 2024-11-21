import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CancelCreateButtonComponent } from '../../../../shared/cancel-create-button/cancel-create-button.component';
import { Contact } from '../../../interfaces/api.interface';
import { ContactService } from '../../contact.service';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, CancelCreateButtonComponent],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent implements OnInit {
  isAddContact: boolean = true;
  selectedContact: Contact | null = null;

  contactData: Contact = {
    name: '',
    email: '',
    telephone: '',
  };

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.selectedContact$.subscribe((contact) => {
      this.selectedContact = contact;
    });

    this.contactService.addContact$.subscribe((addContact) => {
      if (!addContact) {
        this.isAddContact = addContact;
        this.handleEditContact(this.selectedContact);
      }
    });
  }

  onCreateContact(bool: boolean) {
    if (bool) {
      this.contactService.handleCreateContact(this.contactData);
    } else {
      this.contactService.handleUpdateContact(
        this.contactData,
        this.selectedContact?.id!
      );
    }

    this.contactData.name = '';
    this.contactData.email = '';
    this.contactData.telephone = '';
  }

  handleEditContact(contact: Contact | null) {
    this.contactData.name = contact?.name!;
    this.contactData.email = contact?.email!;
    this.contactData.telephone = contact?.telephone!;
  }
}
