import { Component, inject, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { SingleTaskComponent } from './single-task/single-task.component';
import { EditTaskStatusComponent } from './edit-task-status/edit-task-status.component';
import { BoardService } from './board.service';
import { AddNewBoardTaskComponent } from './add-new-board-task/add-new-board-task.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Task } from '../interfaces/api.interface';
import { TaskService } from '../task/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    SingleTaskComponent,
    EditTaskStatusComponent,
    AddNewBoardTaskComponent,
    RouterLink,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  private apiService = inject(ApiService);
  private boardService = inject(BoardService);
  private taskService = inject(TaskService);

  tasks: Task[] = [];
  editTask: boolean = false;
  newTask: boolean = false;
  search_input: string = '';
  token: string | null = null;

  todo: { type: string; tasks: Task[] } = { type: 'todo', tasks: [] };
  await_feedback: { type: string; tasks: Task[] } = {
    type: 'await feedback',
    tasks: [],
  };
  in_progress: { type: string; tasks: Task[] } = {
    type: 'in progress',
    tasks: [],
  };
  done: { type: string; tasks: Task[] } = { type: 'done', tasks: [] };
  currentTask: Task | null = null;

  constructor() {}

  ngOnInit(): void {
    this.boardService.userData$.subscribe((users) => {
      this.tasks = users.map((data) => data.tasks).flat();

      this.in_progress.tasks = this.tasks.filter(
        (task) => task.task_group === 'in progress'
      );

      this.await_feedback.tasks = this.tasks.filter(
        (task) => task.task_group === 'await feedback'
      );

      this.todo.tasks = this.tasks.filter((task) => task.task_group === 'todo');

      this.done.tasks = this.tasks.filter((task) => task.task_group === 'done');
    });

    this.boardService.editTask$.subscribe((state) => {
      this.editTask = state;
    });
    this.boardService.newTask$.subscribe((state) => {
      this.newTask = state;
    });

    this.taskService.task$.subscribe((task) => {
      this.currentTask = task;
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.handleUpdateTaskType(this.todo.tasks, this.todo);
    this.handleUpdateTaskType(this.done.tasks, this.done);
    this.handleUpdateTaskType(this.await_feedback.tasks, this.await_feedback);
    this.handleUpdateTaskType(this.in_progress.tasks, this.in_progress);
  }

  handleUpdateTaskType(
    tasks: Task[],
    typeObject: { type: string; tasks: Task[] }
  ) {
    const newTypeTask = tasks.find(
      (task) => task.task_group !== typeObject.type
    );

    let newTask = { newType: typeObject.type, element: newTypeTask };
    if (newTask.element) {
      this.handleEditTaskState(newTask.newType, newTask.element.id!);
    }
  }

  handleEditTaskState(type: string, id: number) {
    this.token = sessionStorage.getItem('token');

    if (!this.token) {
      return;
    } else {
      this.apiService
        .patchData('users/tasks/' + id + '/', { task_group: type }, this.token)
        .subscribe({
          next: () => {
            console.log('task type successfully updated');
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  onEditTask() {
    this.boardService.emitEditTaskState();
  }

  onAddNewTask() {
    this.boardService.emitNewTaskState();
  }

  sendTask(task: Task) {
    this.taskService.emitTask(task);
  }

  handleComparison(task: Task, input: string) {
    return (
      task.title.toLowerCase().substring(0, input.length) ===
      input.toLowerCase()
    );
  }

  onSearchToDoTask() {
    const filteredTodo = this.todo.tasks.filter((task) =>
      this.handleComparison(task, this.search_input)
    );
    this.todo.tasks = filteredTodo;
  }
  onSearchDoneTask() {
    const filteredTodo = this.done.tasks.filter((task) =>
      this.handleComparison(task, this.search_input)
    );
    this.done.tasks = filteredTodo;
  }
  onSearchInProgressTask() {
    const filteredTodo = this.in_progress.tasks.filter((task) =>
      this.handleComparison(task, this.search_input)
    );
    this.in_progress.tasks = filteredTodo;
  }
  onSearchAwaitFBTask() {
    const filteredTodo = this.await_feedback.tasks.filter((task) =>
      this.handleComparison(task, this.search_input)
    );
    this.await_feedback.tasks = filteredTodo;
  }

  onSearchAllTask() {
    if (this.search_input && this.search_input !== ' ') {
      this.onSearchToDoTask();
      this.onSearchAwaitFBTask();
      this.onSearchInProgressTask();
      this.onSearchDoneTask();
    } else {
      this.in_progress.tasks = this.tasks.filter(
        (task) => task.task_group === 'in progress'
      );

      this.await_feedback.tasks = this.tasks.filter(
        (task) => task.task_group === 'await feedback'
      );

      this.todo.tasks = this.tasks.filter((task) => task.task_group === 'todo');

      this.done.tasks = this.tasks.filter((task) => task.task_group === 'done');
    }
  }
}
