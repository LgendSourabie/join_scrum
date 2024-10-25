import { Component } from '@angular/core';
import { WrapperComponent } from '../wrapper/wrapper.component';
import { TitleBoardComponent } from '../shared/title-board/title-board.component';
import { ContactNameInitialComponent } from '../shared/contact-name-initial/contact-name-initial.component';
import { ContactFormComponent } from '../shared/contact-form/contact-form.component';

@Component({
  selector: 'app-edit-or-add-contact',
  standalone: true,
  imports: [
    WrapperComponent,
    TitleBoardComponent,
    ContactNameInitialComponent,
    ContactFormComponent,
  ],
  templateUrl: './edit-or-add-contact.component.html',
  styleUrl: './edit-or-add-contact.component.scss',
})
export class EditOrAddContactComponent {}
