import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { HelpComponent } from './components/help/help.component';
import { TaskComponent } from './components/task/task.component';
import { SummaryComponent } from './components/summary/summary.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { SubmenuComponent } from './shared/nav-bar/submenu/submenu.component';
import { SideNavigationComponent } from './shared/side-navigation/side-navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WrapperComponent } from './components/contact/wrapper/wrapper.component';
import { EditTaskComponent } from './components/task/edit-task/edit-task.component';
import { EditOrAddContactComponent } from './components/contact/edit-or-add-contact/edit-or-add-contact.component';
import { DeleteEditDialogComponent } from './components/contact/delete-edit-dialog/delete-edit-dialog.component';
import { BetterWithTeamComponent } from './shared/better-with-team/better-with-team.component';
import { EditTaskStatusComponent } from './components/board/edit-task-status/edit-task-status.component';
import { SingleTaskComponent } from './components/board/single-task/single-task.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { ContactListComponent } from './components/contact/contact-list/contact-list.component';
import { AddNewTaskComponent } from './shared/add-new-task/add-new-task.component';
import { ContactDialogWrapperComponent } from './components/board/contact-dialog-wrapper/contact-dialog-wrapper.component';
import { AddNewBoardTaskComponent } from './components/board/add-new-board-task/add-new-board-task.component';
import { ApiService } from './services/api.service';
import { BoardService } from './components/board/board.service';
import { TaskService } from './components/task/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PrivacyPolicyComponent,
    HelpComponent,
    TaskComponent,
    SummaryComponent,
    NavBarComponent,
    SubmenuComponent,
    SideNavigationComponent,
    DashboardComponent,
    WrapperComponent,
    EditTaskComponent,
    EditOrAddContactComponent,
    DeleteEditDialogComponent,
    BetterWithTeamComponent,
    EditTaskStatusComponent,
    SingleTaskComponent,
    ConfirmationDialogComponent,
    ContactListComponent,
    AddNewTaskComponent,
    ContactDialogWrapperComponent,
    AddNewBoardTaskComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'join_scrum';
  isLoading: boolean = true;

  token: string | null = null;

  constructor(
    private apiService: ApiService,
    private boardService: BoardService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.getUpdatedData();
    this.getUpdatedCategories();
  }

  getUpdatedData() {
    this.token = sessionStorage.getItem('token');
    if (this.token) {
      this.boardService.fetchUserData('accounts/', this.token);
    }
  }

  getUpdatedCategories() {
    this.token = sessionStorage.getItem('token');
    if (this.token) {
      this.taskService.fetchCategories('categories/', this.token);
    }
  }
}
