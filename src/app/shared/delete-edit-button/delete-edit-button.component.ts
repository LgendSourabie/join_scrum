import { Component, inject, Input, OnInit } from '@angular/core';
import { ContactService } from '../../components/contact/contact.service';
import { ApiService } from '../../services/api.service';
import { BoardService } from '../../components/board/board.service';

@Component({
  selector: 'app-delete-edit-button',
  standalone: true,
  imports: [],
  templateUrl: './delete-edit-button.component.html',
  styleUrl: './delete-edit-button.component.scss',
})
export class DeleteEditButtonComponent implements OnInit {
  private contactService = inject(ContactService);
  private boardService = inject(BoardService);
  token: string | null = null;
  isEditTaskData: boolean = false;
  editData: boolean = false;
  @Input({ required: true }) deleteRef!: { id: number; element: string };
  @Input({ required: true }) template: string = 'contact';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.boardService.editTask$.subscribe((state) => {
      this.isEditTaskData = state;
    });
    this.boardService.editTaskData$.subscribe((state) => {
      this.editData = state;
    });
  }

  onAddContact(value: boolean) {
    this.contactService.emitAddContact(value);
  }

  onEditContact() {
    this.contactService.emitNewContactState();
    this.onAddContact(false);
  }

  onEditTask() {
    console.log('task');
    this.boardService.emitEditTaskState();
    this.boardService.emitNewTaskState();
    this.boardService.emitEditTaskData(true);
  }

  onDeleteContact() {
    this.token = sessionStorage.getItem('token');

    if (!this.token) {
      return;
    } else {
      this.apiService
        .deleteData(
          'users/' + this.deleteRef.element + '/' + this.deleteRef.id + '/',
          this.token
        )
        .subscribe({
          next: () => {
            console.log('contact successfully deleted');
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
}
