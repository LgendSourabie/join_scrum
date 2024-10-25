import { Component } from '@angular/core';
import { ContactNameInitialComponent } from '../shared/contact-name-initial/contact-name-initial.component';
import { BetterWithTeamComponent } from '../../../shared/better-with-team/better-with-team.component';
import { DeleteEditButtonComponent } from '../../../shared/delete-edit-button/delete-edit-button.component';

@Component({
  selector: 'app-delete-edit-dialog',
  standalone: true,
  imports: [
    ContactNameInitialComponent,
    BetterWithTeamComponent,
    DeleteEditButtonComponent,
  ],
  templateUrl: './delete-edit-dialog.component.html',
  styleUrl: './delete-edit-dialog.component.scss',
})
export class DeleteEditDialogComponent {}
