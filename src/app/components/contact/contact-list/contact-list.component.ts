import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../../interfaces/api.interface';
import { ModulesService } from '../../../services/modules.service';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../board/board.service';
import { HeadMobileComponent } from '../head-mobile/head-mobile.component';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, HeadMobileComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
})
export class ContactListComponent implements OnInit {
  private contactService = inject(ContactService);
  private moduleService = inject(ModulesService);
  private boardService = inject(BoardService);

  chosenLinkIndexGroup!: number;
  chosenLinkIndexContact!: number;
  contacts: Contact[] = [];
  groupedContact: any;

  constructor() {}

  ngOnInit(): void {
    this.boardService.userData$.subscribe((users) => {
      this.contacts = users.map((user) => user.contacts).flat();
      this.groupedContact = this.groupContactByLetter(this.contacts);
    });
  }

  onOpenSingleContact(val: boolean) {
    this.contactService.emitSubmenuState(val);
  }

  handleIndex(indGroup: number, indexSingleContact: number) {
    this.chosenLinkIndexGroup = indGroup;
    this.chosenLinkIndexContact = indexSingleContact;
  }

  onOpenNewContact(val: boolean) {
    this.contactService.emitNewContactState();
    this.contactService.emitInitialPicture(val);
  }

  getNameInitials(name: string) {
    return this.moduleService.getNameInitials(name);
  }

  onAddContact(value: boolean) {
    this.contactService.emitAddContact(value);
  }

  onSendSelectedContact(contact: Contact | null) {
    this.contactService.emitSelectedContact(contact);
  }

  onChangeView(view: 'contact-list' | 'contact-infos') {
    this.contactService.emitHandleView(view);
  }

  groupContactByLetter(contacts: Contact[]) {
    const groupedContact: { [key: string]: any[] } = {};

    contacts.forEach((contact) => {
      const firstLetter = contact.name[0];

      if (!groupedContact[firstLetter]) {
        groupedContact[firstLetter] = [];
      }
      groupedContact[firstLetter].push(contact);
    });

    return Object.entries(groupedContact)
      .map(([letter, contact]) => ({
        letter,
        contacts: contact,
      }))
      .sort((a, b) => a.letter.localeCompare(b.letter));
  }
}
