import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category, Task } from '../interfaces/api.interface';
import { ApiService } from '../../services/api.service';

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
    title: string[] | null;
    due_date: string[] | null;
    category: string[] | null;
    description: string[] | null;
  }>({ title: null, due_date: null, category: null, description: null });
  errorCreateTask$ = this.taskCreateErrorSubject.asObservable();
  token: string | null = null;

  constructor(private apiService: ApiService) {}

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

  emitOpenCategories() {
    this.open = !this.open;
    this.openCategoriesSubject.next(this.open);
  }

  emitShowContact(bool: boolean) {
    this.openContactSubject.next(bool);
  }

  emitTask(task: Task) {
    this.taskSubject.next(task);
  }

  emitCategory(categoryTitle: string) {
    this.chosenCategorySubject.next(categoryTitle);
  }

  async handleCreateTask(data: any) {
    this.token = sessionStorage.getItem('token');

    console.log('TASK DATA', data);

    if (!this.token) {
      return;
    } else {
      this.apiService
        .postData(
          'users/tasks/',

          data,
          this.apiService.getAuthHeaders(this.token)
        )
        .subscribe({
          next: () => {
            this.taskCreateErrorSubject.next({
              title: null,
              due_date: null,
              category: null,
              description: null,
            });
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

    console.log('TASK DATA', data);

    if (!this.token) {
      return;
    } else {
      this.apiService
        .putData(
          'users/tasks/' + id + '/',

          data,
          this.token
        )
        .subscribe({
          next: () => {
            this.taskCreateErrorSubject.next({
              title: null,
              due_date: null,
              category: null,
              description: null,
            });
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
      description: null,
    });
  }
}
