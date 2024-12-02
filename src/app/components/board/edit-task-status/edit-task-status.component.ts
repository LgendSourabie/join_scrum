import { Component, inject, Input, OnInit } from '@angular/core';
import { DeleteEditButtonComponent } from '../../../shared/delete-edit-button/delete-edit-button.component';
import { BoardService } from '../board.service';
import { Task } from '../../interfaces/api.interface';
import { ModulesService } from '../../../services/modules.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { TaskService } from '../../task/task.service';

@Component({
  selector: 'app-edit-task-status',
  standalone: true,
  imports: [DeleteEditButtonComponent, CommonModule],
  templateUrl: './edit-task-status.component.html',
  styleUrl: './edit-task-status.component.scss',
})
export class EditTaskStatusComponent implements OnInit {
  private moduleService = inject(ModulesService);
  private taskService = inject(TaskService);
  token: string | null = null;

  task!: Task | null;
  constructor(
    private apiService: ApiService,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.getUpdatedData();

    this.taskService.task$.subscribe((currentTask) => {
      this.task = currentTask;
    });
  }

  getUpdatedData() {
    this.token = sessionStorage.getItem('token');
    if (this.token) {
      this.boardService.fetchUserData('accounts/', this.token);
    }
  }

  onEditTask() {
    this.boardService.emitEditTaskState(true);
  }
  onCloseTask() {
    this.boardService.emitEditTaskState(false);
  }

  getNameInitials(name: string) {
    return this.moduleService.getNameInitials(name);
  }

  onSubtaskComplete(isSubtaskCompleted: boolean, id: number) {
    this.token = sessionStorage.getItem('token');
    if (!this.token) {
      return;
    } else {
      this.apiService
        .patchData(
          'subtasks/' + id + '/',
          {
            is_completed: !isSubtaskCompleted,
          },

          this.token
        )
        .subscribe({
          complete: () => {
            this.getUpdatedData();
          },
        });
    }
  }

  onCompleteSubtask(id: number) {
    const element = document.getElementById('checkbox-' + id) as HTMLElement;

    if (element) {
      const src = element.getAttribute('src');

      if (src === 'assets/icons/checkButton.svg') {
        element.setAttribute('src', 'assets/icons/checkbox.svg');
      } else {
        element.setAttribute('src', 'assets/icons/checkButton.svg');
      }
    }
  }
}
