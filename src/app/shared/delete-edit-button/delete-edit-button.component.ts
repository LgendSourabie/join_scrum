import { Component, inject, Input, OnInit } from '@angular/core';
import { ContactService } from '../../components/contact/contact.service';
import { ApiService } from '../../services/api.service';
import { BoardService } from '../../components/board/board.service';
import { TaskService } from '../../components/task/task.service';

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

  constructor(
    private apiService: ApiService,
    private taskService: TaskService
  ) {}

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
    this.contactService.emitNewContactState(true);
    this.onAddContact(false);
  }

  onEditTask() {
    this.boardService.emitEditTaskState(true);
    this.boardService.newTaskState(true);
    this.boardService.emitEditTaskData(true);
  }

  handleResetContactError() {
    this.contactService.resetContactError();
  }

  onDeleteContact() {
    this.token = sessionStorage.getItem('token');

    if (!this.token) {
      return;
    } else {
      this.apiService
        .deleteData(
          this.deleteRef.element + '/' + this.deleteRef.id + '/',
          this.token
        )
        .subscribe({
          next: () => {
            this.closeDeletedTaskEdition();
          },
          complete: () => {
            this.boardService.getUpdatedData();
          },
          error: (error) => {
            console.log('An error happened!');
          },
        });
    }
  }

  closeDeletedTaskEdition() {
    this.boardService.emitEditTaskState(false);
    this.boardService.emitEditTaskData(false);
  }

  handelTaskErrorReset() {
    this.taskService.onInitializeErrorState();
  }
}
