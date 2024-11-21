import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { User } from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private editTaskStatus = new BehaviorSubject<boolean>(false);
  private addNewTaskStatus = new BehaviorSubject<boolean>(false);
  private editTaskDataStatus = new BehaviorSubject<boolean>(false);
  private isLoadingSubject = new BehaviorSubject<boolean>(true);
  private errorSubject = new BehaviorSubject<string>('');
  private userDataSubject = new BehaviorSubject<User[]>([]);

  editTask$ = this.editTaskStatus.asObservable();
  newTask$ = this.addNewTaskStatus.asObservable();
  editTaskData$ = this.editTaskDataStatus.asObservable();
  isLoading$ = this.isLoadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();
  userData$ = this.userDataSubject.asObservable();
  is_edit_task = false;
  isTaskEditing = false;

  constructor(private apiService: ApiService) {}

  fetchUserData(endpoint: string, token: string) {
    this.isLoadingSubject.next(true);
    this.apiService.getData(endpoint, token).subscribe({
      next: (response) => {
        this.userDataSubject.next(response.body);
      },
      error: (error) => {
        this.errorSubject.next(error.message);
      },
      complete: () => {
        this.isLoadingSubject.next(false);
      },
    });
  }

  emitEditTaskState() {
    this.is_edit_task = !this.is_edit_task;
    this.editTaskStatus.next(this.is_edit_task);
  }
  emitNewTaskState() {
    this.is_edit_task = !this.is_edit_task;
    this.addNewTaskStatus.next(this.is_edit_task);
  }

  emitEditTaskData(val: boolean) {
    this.editTaskDataStatus.next(val);
  }
}
