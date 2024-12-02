import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { User } from '../interfaces/api.interface';
import { ModulesService } from '../../services/modules.service';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private editTaskStatus = new BehaviorSubject<boolean>(false);
  private addNewTaskStatus = new BehaviorSubject<boolean>(false);
  private editTaskDataStatus = new BehaviorSubject<boolean>(false);

  editTask$ = this.editTaskStatus.asObservable();
  newTask$ = this.addNewTaskStatus.asObservable();
  editTaskData$ = this.editTaskDataStatus.asObservable();
  is_edit_task = false;
  isTaskEditing = false;
  token: string | null = null;

  constructor(
    private apiService: ApiService,
    private moduleService: ModulesService
  ) {}

  fetchUserData(endpoint: string, token: string) {
    this.moduleService.emitLoading(true);
    this.apiService.getData(endpoint, token).subscribe({
      next: (response) => {
        this.moduleService.emitAccountData(response.body);
      },
      error: (error) => {
        this.moduleService.emitFetchError(error.message);
      },
      complete: () => {
        this.moduleService.emitLoading(false);
      },
    });
  }

  getUpdatedData() {
    this.token = sessionStorage.getItem('token');
    if (this.token) {
      this.fetchUserData('accounts/', this.token);
    }
  }

  emitEditTaskState(val: boolean) {
    this.editTaskStatus.next(val);
  }

  emitNewTaskState() {
    this.is_edit_task = !this.is_edit_task;
    this.addNewTaskStatus.next(this.is_edit_task);
  }

  newTaskState(val: boolean) {
    this.addNewTaskStatus.next(val);
  }

  emitEditTaskData(val: boolean) {
    this.editTaskDataStatus.next(val);
  }
}
