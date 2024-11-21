import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-title-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title-board.component.html',
  styleUrl: './title-board.component.scss',
})
export class TitleBoardComponent implements OnInit {
  isAddContact: boolean = true;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.addContact$.subscribe((state) => {
      this.isAddContact = state;
    });
  }
}
