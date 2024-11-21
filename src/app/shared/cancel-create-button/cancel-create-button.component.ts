import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../components/contact/contact.service';

@Component({
  selector: 'app-cancel-create-button',
  standalone: true,
  imports: [],
  templateUrl: './cancel-create-button.component.html',
  styleUrl: './cancel-create-button.component.scss',
})
export class CancelCreateButtonComponent implements OnInit {
  newContact: boolean = false;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.addContact$.subscribe((state) => {
      this.newContact = state;
    });
  }

  onOpenNewContact(val: boolean) {
    this.contactService.emitNewContactState();
    this.contactService.emitInitialPicture(val);
  }
}
