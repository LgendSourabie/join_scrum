import { Component } from '@angular/core';
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
import { EditTaskStatusComponent } from './board/edit-task-status/edit-task-status.component';
import { SingleTaskComponent } from './board/single-task/single-task.component';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'join_scrum';
}
