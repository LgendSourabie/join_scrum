import { Component } from '@angular/core';
import { DeleteEditButtonComponent } from '../../shared/delete-edit-button/delete-edit-button.component';

@Component({
  selector: 'app-edit-task-status',
  standalone: true,
  imports: [DeleteEditButtonComponent],
  templateUrl: './edit-task-status.component.html',
  styleUrl: './edit-task-status.component.scss',
})
export class EditTaskStatusComponent {}
