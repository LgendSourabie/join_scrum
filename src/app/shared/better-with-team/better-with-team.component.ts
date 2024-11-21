import { Component, Input, OnInit } from '@angular/core';
import { ContactService } from '../../components/contact/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-better-with-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './better-with-team.component.html',
  styleUrl: './better-with-team.component.scss',
})
export class BetterWithTeamComponent implements OnInit {
  @Input({ required: true }) title!: string;
  viewName: 'contact-list' | 'contact-infos' = 'contact-list';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.mobileContact$.subscribe((view) => {
      this.viewName = view;
    });
  }

  onViewReset(view: 'contact-list' | 'contact-infos') {
    this.contactService.emitHandleView(view);
  }
}
