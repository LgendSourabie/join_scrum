import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { User } from '../interfaces/api.interface';
import { CommonModule, formatDate } from '@angular/common';
import { BoardService } from '../board/board.service';
import { DashboardService } from '../../dashboard/dashboard.service';
import { ModulesService } from '../../services/modules.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent implements OnInit {
  userData: any[] = [];
  numberTasks: number = 0;
  numberTodos: number = 0;
  numberDone: number = 0;
  numberInProgress: number = 0;
  numberAwaitFeedback: number = 0;
  numberUrgentTasks: number = 0;
  upcoming_deadline: string = new Date().toLocaleDateString();
  dashboardService = inject(DashboardService);
  private moduleService = inject(ModulesService);

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.moduleService.userData$.subscribe((data) => {
      this.userData = data;

      this.getTaskInBoard(this.userData);
      this.numberTodos = this.getNumberTaskType(
        this.userData,
        'task_group',
        'todo'
      );
      this.numberDone = this.getNumberTaskType(
        this.userData,
        'task_group',
        'done'
      );
      this.numberInProgress = this.getNumberTaskType(
        this.userData,
        'task_group',
        'in progress'
      );
      this.numberAwaitFeedback = this.getNumberTaskType(
        this.userData,
        'task_group',
        'await feedback'
      );
      this.numberUrgentTasks = this.getNumberTaskType(
        this.userData,
        'priority',
        'urgent'
      );

      this.upcoming_deadline = this.getUpcomingDeadline(this.userData);
    });
  }

  getTaskInBoard(accountData: User[]) {
    let tasks = accountData.map((data) => data.tasks.length);
    this.numberTasks = tasks.reduce((a, b) => a + b, 0);
  }

  getNumberTaskType(
    accountData: User[] = [],
    key: string,
    taskType: 'todo' | 'await feedback' | 'in progress' | 'done' | 'urgent'
  ) {
    let all_tasks = accountData.map(
      (data) =>
        data.tasks.filter((task) =>
          key === 'task_group'
            ? task.task_group === taskType
            : task.priority === taskType
        ).length
    );
    return all_tasks.reduce((a, b) => a + b, 0);
  }

  getUpcomingDeadline(accountData: User[] = []): string {
    let all_dates = accountData.map((user) =>
      user.tasks.map((task) => new Date(task.due_date).getTime())
    );
    let flat_dates = all_dates.flat();
    let today = Date.now();
    let next_due_Dates = flat_dates.filter((date) => date >= today);

    if (next_due_Dates.length === 0) {
      return 'No deadline';
    }
    let upcoming_date = Math.min(...next_due_Dates);
    return formatDate(new Date(upcoming_date), 'MMMM d, y', 'en-US');
  }

  /**
   * displays a greeting message to the user
   */
  greetUser() {
    let now = new Date();
    let hoursNow = now.getHours();
    if (5 <= hoursNow && hoursNow <= 11) {
      return this.userData.length !== 0 ? `Good morning` : `Good morning!`;
    } else if (12 <= hoursNow && hoursNow <= 17) {
      return this.userData.length !== 0 ? `Good afternoon` : `Good afternoon!`;
    } else {
      return this.userData.length !== 0 ? `Good evening` : `Good evening!`;
    }
  }

  userName() {
    if (this.userData.length === 0) {
      return 'Guest';
    } else {
      return this.userData[0]?.last_name
        ? this.userData[0]?.last_name.split(' ')[0]
        : this.userData[0]?.first_name;
    }
  }

  handleIndex(chosenMenu: string) {
    this.dashboardService.emitChosen(chosenMenu);
  }
}
