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
import { BoardComponent } from './components/board/board.component';
import { OfflinePrivacyPolicyComponent } from './components/login/offline-privacy-policy/offline-privacy-policy.component';
import { OfflineLegaleNoticeComponent } from './components/login/offline-legale-notice/offline-legale-notice.component';
import { authGuard } from './components/interfaces/auth.guard';

export const routes: Routes = [
  { path: 'account/log-in', component: LoginComponent, title: 'Join | Log In' },
  { path: '', redirectTo: 'account/log-in', pathMatch: 'full' },
  {
    path: 'account/privacy-policy',
    component: OfflinePrivacyPolicyComponent,
    title: 'Join | Privacy Policy',
  },
  {
    path: 'account/legal-notice',
    component: OfflineLegaleNoticeComponent,
    title: 'Join | Legal Notice',
  },
  {
    path: 'account/sign-up',
    component: SignUpComponent,
    title: 'Join | Sign Up',
  },
  {
    path: 'dashboard',
    title: 'Dashboard | Join',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      {
        path: 'summary',
        canActivate: [authGuard],
        component: SummaryComponent,
        title: 'Dashboard | Join - Summary',
      },
      {
        path: 'task',
        component: TaskComponent,
        canActivate: [authGuard],
        title: 'Dashboard | Join - Task',
      },
      {
        path: 'board',
        component: BoardComponent,
        canActivate: [authGuard],
        title: 'Dashboard | Join - Board',
      },
      {
        path: 'contacts',
        component: ContactComponent,
        canActivate: [authGuard],
        title: 'Dashboard | Join - Contacts',
      },
      {
        path: 'legal-notice',
        component: LegalNoticeComponent,
        canActivate: [authGuard],
        title: 'Dashboard | Join - Legal Notice',
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        canActivate: [authGuard],
        title: 'Dashboard | Join - Privacy Policy',
      },
      {
        path: 'help',
        component: HelpComponent,
        canActivate: [authGuard],
        title: 'Dashboard | Join - Help',
      },
    ],
  },
  { path: '**', redirectTo: 'account/log-in' },
];
