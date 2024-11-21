import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { DateCategorySectionComponent } from './date-category-section/date-category-section.component';
import { TitleDescriptionSectionComponent } from './title-description-section/title-description-section.component';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../components/board/board.service';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { TaskService } from '../../components/task/task.service';
import { Task } from '../../components/interfaces/api.interface';

@Component({
  selector: 'app-add-new-task',
  standalone: true,
  imports: [
    DateCategorySectionComponent,
    TitleDescriptionSectionComponent,
    CommonModule,
    FormsModule,
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

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.taskService.onResetErrorState();

    this.taskService.task$.subscribe((data) => {
      this.toEditTask = data;
    });
  }

  onCloseAddTask() {
    this.boardService.emitNewTaskState();
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

    this.taskService.handleCreateTask(data).then((error) => {
      console.log('ne', error);

      if (error !== undefined) {
        this.titleDesc.resetTitleDescData();
        this.dateCategory.resetDateCategoryData();
      }
    });
  }

  onEditTask(id: number) {
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

    this.taskService.handleEditTask(data, id).then((error) => {
      console.log('ne', error);

      if (error !== undefined) {
        this.titleDesc.resetTitleDescData();
        this.dateCategory.resetDateCategoryData();
      }
    });
  }
}
