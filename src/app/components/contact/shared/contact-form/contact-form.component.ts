import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Contact } from '../../../interfaces/api.interface';
import { ContactService } from '../../contact.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, ConfirmationDialogComponent],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent implements OnInit {
  isAddContact: boolean = true;
  selectedContact: Contact | null = null;
  newContact: boolean = false;
  nameFieldError: boolean = false;
  errorContact: {
    name: string[] | null | undefined;
    email: string[] | null | undefined;
    telephone: string[] | null | undefined;
  } = { name: undefined, email: undefined, telephone: undefined };

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

    this.contactService.addContact$.subscribe((state) => {
      this.newContact = state;
    });

    this.contactService.addContact$.subscribe((addContact) => {
      if (!addContact) {
        this.isAddContact = addContact;
        this.handleEditContact(this.selectedContact);
      }
    });
  }

  onCreateContact(bool: boolean) {
    const element = document.getElementById('contact-success') as HTMLElement;

    if (bool) {
      this.contactService.handleCreateContact(this.contactData).then(() => {
        this.contactService.errorCreateContact$.subscribe((error) => {
          this.errorContact = error;
          console.log('error', this.errorContact);

          if (
            this.errorContact.email! == undefined &&
            this.errorContact.name! == undefined &&
            this.errorContact.telephone! == undefined
          ) {
            if (
              this.errorContact.name === null &&
              this.errorContact.email === null &&
              this.errorContact.telephone === null
            ) {
              this.confirmContactCreation(element);
              this.returnToContact(element);
              this.handelResetContactForm();
            }
          }
        });
      });
    } else {
      this.contactService
        .handleUpdateContact(this.contactData, this.selectedContact?.id!)
        .then(() => {
          this.confirmContactCreation(element);
          this.returnToContact(element);
          this.handelResetContactForm();
        });
    }
  }

  handelResetContactForm() {
    this.contactData.name = '';
    this.contactData.email = '';
    this.contactData.telephone = '';
  }

  onOpenNewContact(val: boolean) {
    this.contactService.emitNewContactState(val);
    this.contactService.emitInitialPicture(val);
  }

  handleEditContact(contact: Contact | null) {
    this.contactData.name = contact?.name!;
    this.contactData.email = contact?.email!;
    this.contactData.telephone = contact?.telephone!;
  }

  confirmContactCreation(element: HTMLElement) {
    if (element) {
      element.classList.add('slideIn');
    }
  }

  returnToContact(element: HTMLElement) {
    setTimeout(() => {
      if (element) {
        element.classList.remove('slideIn');
        this.onOpenNewContact(false);
      }
    }, 800);
  }
}
