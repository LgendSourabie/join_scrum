import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category, Task } from '../interfaces/api.interface';
import { ApiService } from '../../services/api.service';
import { BoardService } from '../board/board.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private openContactSubject = new BehaviorSubject<boolean>(false);
  private chosenCategorySubject = new BehaviorSubject<string>('');
  private openCategoriesSubject = new BehaviorSubject<boolean>(false);
  private taskSubject = new BehaviorSubject<Task | null>(null);
  private isLoadingSubject = new BehaviorSubject<boolean>(true);
  private errorSubject = new BehaviorSubject<string>('');
  private categoriesSubject = new BehaviorSubject<Category[]>([]);

  openContacts$ = this.openContactSubject.asObservable();
  chosenCategory$ = this.chosenCategorySubject.asObservable();
  openCategories$ = this.openCategoriesSubject.asObservable();
  categories$ = this.categoriesSubject.asObservable();
  task$ = this.taskSubject.asObservable();
  open: boolean = false;
  isLoading$ = this.isLoadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();
  taskCreateErrorSubject = new BehaviorSubject<{
    title: string[] | null | undefined;
    due_date: string[] | null | undefined;
    category: string[] | null | undefined;
  }>({
    title: undefined,
    due_date: undefined,
    category: undefined,
  });
  errorCreateTask$ = this.taskCreateErrorSubject.asObservable();
  token: string | null = null;

  constructor(
    private apiService: ApiService,
    private boardService: BoardService
  ) {}

  fetchCategories(endpoint: string, token: string) {
    this.isLoadingSubject.next(true);
    this.apiService.getData(endpoint, token).subscribe({
      next: (response) => {
        this.categoriesSubject.next(response.body);
      },
      error: (error) => {
        this.errorSubject.next(error.message);
      },
      complete: () => {
        this.isLoadingSubject.next(false);
      },
    });
  }

  emitOpenContact() {
    this.open = !this.open;
    this.openContactSubject.next(this.open);
  }

  closeAssignTo() {
    this.openContactSubject.next(false);
  }

  emitOpenCategories() {
    this.open = !this.open;
    this.openCategoriesSubject.next(this.open);
  }

  emitShowContact(bool: boolean) {
    this.openContactSubject.next(bool);
  }

  emitTask(task: Task | null) {
    this.taskSubject.next(task);
  }

  emitCategory(categoryTitle: string) {
    this.chosenCategorySubject.next(categoryTitle);
  }

  async handleCreateTask(data: any) {
    this.token = sessionStorage.getItem('token');

    if (!this.token) {
      return;
    } else {
      this.apiService
        .postData(
          'tasks/',

          data,
          this.apiService.getAuthHeaders(this.token)
        )
        .subscribe({
          next: () => {
            this.onResetErrorState();
          },
          complete: () => {
            this.boardService.getUpdatedData();
          },
          error: (error) => {
            if (error.status === 400) {
              this.taskCreateErrorSubject.next(error.error);
              return error.error;
            } else if (error.status === 404) {
              return error.error;
            }
          },
        });
    }
  }

  async handleEditTask(data: any, id: number) {
    this.token = sessionStorage.getItem('token');

    if (!this.token) {
      return;
    } else {
      this.apiService
        .putData(
          'tasks/' + id + '/',

          data,
          this.token
        )
        .subscribe({
          next: () => {
            this.onResetErrorState();
          },
          complete: () => {
            this.boardService.getUpdatedData();
          },
          error: (error) => {
            if (error.status === 400) {
              this.taskCreateErrorSubject.next(error.error);

              return error.error;
            } else if (error.status === 404) {
              return error.error;
            }
          },
        });
    }
  }

  onResetErrorState() {
    this.taskCreateErrorSubject.next({
      title: null,
      due_date: null,
      category: null,
    });
  }
  onInitializeErrorState() {
    this.taskCreateErrorSubject.next({
      title: undefined,
      due_date: undefined,
      category: undefined,
    });
  }
}
