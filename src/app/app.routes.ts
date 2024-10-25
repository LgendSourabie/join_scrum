import { Routes } from '@angular/router';
import { SummaryComponent } from './components/summary/summary.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TaskComponent } from './components/task/task.component';
import { ContactComponent } from './components/contact/contact.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { HelpComponent } from './components/help/help.component';

export const routes: Routes = [
  // { path: 'account/log-in', component: LoginComponent, title: 'Join | Log In' },
  // { path: '', redirectTo: 'account/log-in', pathMatch: 'full' },
  // {
  //   path: 'account/sign-up',
  //   component: SignUpComponent,
  //   title: 'Join | Sign Up',
  // },
  // {
  //   path: 'dashboard',
  //   title: 'Dashboard | Join',
  //   component: DashboardComponent,
  //   children: [
  //     { path: '', redirectTo: 'summary', pathMatch: 'full' },
  //     {
  //       path: 'summary',
  //       component: SummaryComponent,
  //       title: 'Dashboard | Join - Summary',
  //     },
  //     {
  //       path: 'task',
  //       component: TaskComponent,
  //       title: 'Dashboard | Join - Task',
  //     },
  //     {
  //       path: 'board',
  //       component: BoardComponent,
  //       title: 'Dashboard | Join - Board',
  //     },
  //     {
  //       path: 'contact',
  //       component: ContactComponent,
  //       title: 'Dashboard | Join - Contact',
  //     },
  //     {
  //       path: 'legal-notice',
  //       component: LegalNoticeComponent,
  //       title: 'Dashboard | Join - Legal Notice',
  //     },
  //     {
  //       path: 'privacy-policy',
  //       component: PrivacyPolicyComponent,
  //       title: 'Dashboard | Join - Privacy Policy',
  //     },
  //     {
  //       path: 'help',
  //       component: HelpComponent,
  //       title: 'Dashboard | Join - Help',
  //     },
  //   ],
  // },
  // { path: '**', component: PageNotFoundComponent },
];
