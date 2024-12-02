import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Priority, priorityData } from './date-category-interface';
import { TaskService } from '../../../components/task/task.service';
import { CategoriesComponent } from '../../../components/task/categories/categories.component';
import { FormsModule } from '@angular/forms';
import { Subtask, Task } from '../../../components/interfaces/api.interface';
import { SubtasksListComponent } from './subtasks-list/subtasks-list.component';
import { BoardService } from '../../../components/board/board.service';

@Component({
  selector: 'app-date-category-section',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    CategoriesComponent,
    SubtasksListComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './date-category-section.component.html',
  styleUrl: './date-category-section.component.scss',
})
export class DateCategorySectionComponent implements AfterViewInit, OnInit {
  priorities: Priority[] = priorityData;
  priorityName: string = 'medium';
  is_add_btn: boolean = true;
  openCategories: boolean = false;
  chosenCategory: string = '';
  subtasks_list: Subtask[] = [];
  subtask_btn_opener: boolean = false;
  isEditingData: boolean = false;
  toEditTask: Task | null = null;
  errorCreateTask: {
    title: string[] | null | undefined;
    due_date: string[] | null | undefined;
    category: string[] | null | undefined;
  } = {
    title: undefined,
    due_date: undefined,
    category: undefined,
  };

  task = {
    date: '',
    priority: 'medium',
    category: '',
    subtask_description: '',
  };

  @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;
  constructor(
    private taskService: TaskService,
    private boardService: BoardService
  ) {}

  ngAfterViewInit() {
    this.dateInput.nativeElement.addEventListener(
      'input',
      this.formatDateInput.bind(this)
    );
    this.taskService.chosenCategory$.subscribe((title) => {
      this.chosenCategory = title;
      this.task.category = this.chosenCategory;
    });
  }

  ngOnInit(): void {
    this.taskService.openCategories$.subscribe((state) => {
      this.openCategories = state;
    });

    this.taskService.errorCreateTask$.subscribe((values) => {
      this.errorCreateTask = values;
    });

    this.boardService.editTaskData$.subscribe((state) => {
      this.isEditingData = state;
    });

    this.taskService.task$.subscribe((data) => {
      this.toEditTask = data;
    });

    this.onEditingTaskData(this.toEditTask!);
  }

  onEditingTaskData(data: Task) {
    if (this.isEditingData) {
      this.task.date = data.due_date!;
      this.task.priority = data.priority!;
      setTimeout(() => {
        this.task.category = data.category!;
      });
      this.subtasks_list = data.subtasks!;
      this.onSelectPriority(this.task.priority);
    }
  }

  getDateCategoryData() {
    return {
      date: this.task.date,
      priority: this.task.priority,
      category: this.task.category,
      subtasks: this.subtasks_list,
    };
  }

  resetDateCategoryData() {
    this.task.date = '';
    this.task.priority = 'medium';
    this.task.subtask_description = '';
    this.priorityName = 'medium';
    this.subtasks_list = [];
    this.taskService.emitCategory('');
  }

  private formatDateInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.type === 'text') {
      let value = input.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
      if (value.length >= 5) {
        value = value.slice(0, 5) + '/' + value.slice(5);
      }
      input.value = value.slice(0, 10);
    }
  }

  onOpenCategories() {
    this.taskService.emitOpenCategories();
  }

  onSelectPriority(name: string) {
    this.priorityName = name;
  }

  onChoosePriority(description: string) {
    this.task.priority = description;
  }

  onAddSubtask(description: string) {
    if (description && description !== ' ') {
      this.subtasks_list.push({ description: description });
      this.onCancelSubtask();
    }
  }

  onOpenAddSubtask() {
    this.subtask_btn_opener = true;
    this.is_add_btn = false;
  }

  onCancelSubtask() {
    this.task.subtask_description = '';
    this.is_add_btn = true;
    this.subtask_btn_opener = false;
  }

  onStartAddSubtask() {
    this.subtask_btn_opener = false;
    if (
      this.task.subtask_description &&
      this.task.subtask_description !== ' ' &&
      !this.subtask_btn_opener
    ) {
      this.is_add_btn = false;
    } else {
      this.is_add_btn = true;
    }
  }
}
