import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterStateSnapshot } from '@angular/router';
import { linkData, Links } from './nav-links-interface';
import { ContactService } from '../../components/contact/contact.service';
import { DashboardService } from '../../dashboard/dashboard.service';

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

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.dashboardService.chosenMenu$.subscribe((menu) => {
      this.chosenMenu = menu;
      // if (this.chosenMenu) {
      //   this.handleIndex(this.chosenMenu);
      // }
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
}
