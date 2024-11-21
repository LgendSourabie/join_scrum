import { Component, inject, Input, OnInit } from '@angular/core';
import { DeleteEditButtonComponent } from '../../../shared/delete-edit-button/delete-edit-button.component';
import { BoardService } from '../board.service';
import { Task } from '../../interfaces/api.interface';
import { ModulesService } from '../../../services/modules.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-edit-task-status',
  standalone: true,
  imports: [DeleteEditButtonComponent, CommonModule],
  templateUrl: './edit-task-status.component.html',
  styleUrl: './edit-task-status.component.scss',
})
export class EditTaskStatusComponent implements OnInit {
  private moduleService = inject(ModulesService);
  token: string | null = null;

  @Input({ required: true }) task!: Task | null;
  constructor(
    private apiService: ApiService,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.getUpdatedData();
  }

  getUpdatedData() {
    this.token = sessionStorage.getItem('token');
    if (this.token) {
      this.boardService.fetchUserData('accounts/', this.token);
    }
  }

  onEditTask() {
    this.boardService.emitEditTaskState();
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
        .subscribe((response) => {});
    }
  }
}
