import { Component, OnInit } from '@angular/core';
import { WrapperComponent } from '../wrapper/wrapper.component';
import { TitleBoardComponent } from '../shared/title-board/title-board.component';
import { ContactNameInitialComponent } from '../shared/contact-name-initial/contact-name-initial.component';
import { ContactFormComponent } from '../shared/contact-form/contact-form.component';
import { ContactService } from '../contact.service';
import { PersonPictureComponent } from '../shared/person-picture/person-picture.component';

@Component({
  selector: 'app-edit-or-add-contact',
  standalone: true,
  imports: [
    WrapperComponent,
    TitleBoardComponent,
    ContactNameInitialComponent,
    ContactFormComponent,
    PersonPictureComponent,
  ],
  templateUrl: './edit-or-add-contact.component.html',
  styleUrl: './edit-or-add-contact.component.scss',
})
export class EditOrAddContactComponent implements OnInit {
  newContact: boolean = false;
  isPictureContact: boolean = false;
  viewName: 'contact-list' | 'contact-infos' = 'contact-list';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.open_newContact$.subscribe((state) => {
      this.newContact = state;
    });

    this.contactService.initialAlternate$.subscribe((state) => {
      this.isPictureContact = state;
    });

    this.contactService.mobileContact$.subscribe((view) => {
      this.viewName = view;
    });
  }

  onOpenNewContact(val: boolean) {
    this.contactService.emitNewContactState();
    this.contactService.emitInitialPicture(val);
  }
}
