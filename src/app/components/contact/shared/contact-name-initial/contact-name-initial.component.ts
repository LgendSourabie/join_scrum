import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../../contact.service';
import { Contact } from '../../../interfaces/api.interface';
import { ModulesService } from '../../../../services/modules.service';

@Component({
  selector: 'app-contact-name-initial',
  standalone: true,
  imports: [],
  templateUrl: './contact-name-initial.component.html',
  styleUrl: './contact-name-initial.component.scss',
})
export class ContactNameInitialComponent implements OnInit {
  selectedContact: Contact | null = null;
  isAddContact: boolean = true;

  private moduleService = inject(ModulesService);

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.selectedContact$.subscribe((contact) => {
      this.selectedContact = contact;
    });

    this.contactService.addContact$.subscribe((state) => {
      this.isAddContact = state;
    });
  }

  getNameInitials(name: string) {
    return this.moduleService.getNameInitials(name);
  }
}
