import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { linkData, Links } from './nav-links-interface';
import { ContactService } from '../../components/contact/contact.service';
import { DashboardService } from '../../dashboard/dashboard.service';
import { TaskService } from '../../components/task/task.service';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss',
})
export class SideNavigationComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  chosenMenu: string = 'summary';
  links: Links[] = linkData;
  chosenNav: string = '';

  constructor(
    private contactService: ContactService,
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let currentRoute = this.route;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    currentRoute.url.subscribe((segments) => {
      this.chosenNav =
        segments.length > 0 ? segments[segments.length - 1].path : '';
      this.handleIndex(this.chosenNav);
    });

    this.dashboardService.chosenMenu$.subscribe((menu) => {
      this.chosenMenu = menu;
    });
  }

  handleIndex(chosenMenu: string) {
    this.dashboardService.emitChosen(chosenMenu);
  }

  handleReturn() {
    this.dashboardService.emitPreviousChosen();
  }

  resetSelectedContact() {
    this.contactService.emitSelectedContact(null);
  }

  handelTaskErrorReset() {
    this.taskService.onInitializeErrorState();
  }

  initializeState() {
    this.handelTaskErrorReset();
    this.handleCloseAssignTo();
    this.handleResetEmittedContactArray();
  }

  handleResetEmittedContactArray() {
    this.contactService.emitContactArray([]);
  }

  handleCloseAssignTo() {
    this.taskService.closeAssignTo();
  }
}
