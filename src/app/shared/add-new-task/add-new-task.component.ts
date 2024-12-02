import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { DateCategorySectionComponent } from './date-category-section/date-category-section.component';
import { TitleDescriptionSectionComponent } from './title-description-section/title-description-section.component';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../components/board/board.service';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { TaskService } from '../../components/task/task.service';
import { Task } from '../../components/interfaces/api.interface';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-add-new-task',
  standalone: true,
  imports: [
    DateCategorySectionComponent,
    TitleDescriptionSectionComponent,
    CommonModule,
    FormsModule,
    ConfirmationDialogComponent,
  ],
  templateUrl: './add-new-task.component.html',
  styleUrl: './add-new-task.component.scss',
})
export class AddNewTaskComponent implements OnInit {
  private taskService = inject(TaskService);

  @Input({ required: true }) boardNewTask: boolean = false;
  @ViewChild(TitleDescriptionSectionComponent)
  titleDesc!: TitleDescriptionSectionComponent;
  @ViewChild(DateCategorySectionComponent)
  dateCategory!: DateCategorySectionComponent;
  @ViewChild('form') templateForm!: NgForm;

  token: string | null = null;
  toEditTask: Task | null = null;
  editTask: boolean = false;
  taskCreateError: {
    title: string[] | null | undefined;
    due_date: string[] | null | undefined;
    category: string[] | null | undefined;
  } = {
    title: undefined,
    due_date: undefined,
    category: undefined,
  };

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.getUpdatedCategories();

    this.taskService.task$.subscribe((data) => {
      this.toEditTask = data;
    });

    this.boardService.editTask$.subscribe((state) => {
      this.editTask = state;
    });
  }

  onCloseAddTask() {
    this.boardService.newTaskState(false);
    this.titleDesc.resetTitleDescData();
    this.dateCategory.resetDateCategoryData();
    this.boardService.emitEditTaskData(false);
    this.templateForm.resetForm();
  }

  handleDateFormat(date: string | Date) {
    if (date === '') {
      return date;
    } else if (typeof date === 'string') {
      return date.slice(0, 10);
    } else {
      return `${date?.getFullYear()}-${
        date?.getMonth() + 1
      }-${date?.getDate()}`;
    }
  }

  onCreateNewTask() {
    const element = document.getElementById('task-success') as HTMLElement;
    const titleDescValues = this.titleDesc.getTitleDescData();
    const dateCategoryValues = this.dateCategory.getDateCategoryData();

    const data = {
      title: titleDescValues.title,
      description:
        titleDescValues.description || 'This task has no description.',
      due_date: this.handleDateFormat(dateCategoryValues.date),
      priority: dateCategoryValues.priority,
      category: dateCategoryValues.category,
      task_group: 'todo',
      task_subtasks: dateCategoryValues.subtasks,
      assigned_to_contact_ids: titleDescValues.assign_to,
    };

    this.taskService.handleCreateTask(data).then(() => {
      this.taskService.errorCreateTask$.subscribe((error) => {
        this.taskCreateError = error;

        if (
          this.taskCreateError.category !== undefined &&
          this.taskCreateError.title !== undefined &&
          this.taskCreateError.due_date !== undefined
        ) {
          if (
            !this.taskCreateError.category &&
            !this.taskCreateError.title &&
            !this.taskCreateError.due_date
          ) {
            this.titleDesc.resetTitleDescData();
            this.dateCategory.resetDateCategoryData();
            this.confirmTaskCreation(element);
            this.returnToBoard(element);
          }
          this.taskService.onInitializeErrorState();
        }
      });
    });
  }

  getUpdatedCategories() {
    this.token = sessionStorage.getItem('token');
    if (this.token) {
      this.taskService.fetchCategories('category_options/', this.token);
    }
  }

  onEditTask(id: number) {
    const element = document.getElementById('task-success') as HTMLElement;
    const titleDescValues = this.titleDesc.getTitleDescData();
    const dateCategoryValues = this.dateCategory.getDateCategoryData();

    const data = {
      title: titleDescValues.title,
      description:
        titleDescValues.description || 'This task has no description.',
      due_date: this.handleDateFormat(dateCategoryValues.date),
      priority: dateCategoryValues.priority,
      category: dateCategoryValues.category,
      task_group: this.toEditTask?.task_group,
      task_subtasks: dateCategoryValues.subtasks,
      assigned_to_contact_ids: titleDescValues.assign_to,
    };

    this.taskService.handleEditTask(data, id).then((error) => {
      this.taskService.errorCreateTask$.subscribe((error) => {
        this.taskCreateError = error;

        if (
          this.taskCreateError.category !== undefined &&
          this.taskCreateError.title !== undefined &&
          this.taskCreateError.due_date !== undefined
        ) {
          if (
            !this.taskCreateError.category &&
            !this.taskCreateError.title &&
            !this.taskCreateError.due_date
          ) {
            this.titleDesc.resetTitleDescData();
            this.dateCategory.resetDateCategoryData();
            this.confirmTaskCreation(element);
            this.returnToBoard(element);
          }

          this.taskService.onInitializeErrorState();
        }
      });
    });
  }

  confirmTaskCreation(element: HTMLElement) {
    if (element) {
      element.classList.add('slideIn');
    }
  }

  returnToBoard(element: HTMLElement) {
    setTimeout(() => {
      if (element) {
        element.classList.remove('slideIn');
        this.onCloseAddTask();
      }
    }, 1000);
  }
}
