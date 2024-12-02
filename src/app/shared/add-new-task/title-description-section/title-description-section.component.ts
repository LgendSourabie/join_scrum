import { Component, inject, OnInit } from '@angular/core';
import { SearchContactComponent } from '../../../components/task/search-contact/search-contact.component';
import { TaskService } from '../../../components/task/task.service';
import { FormsModule } from '@angular/forms';
import {
  Contact,
  Task,
  User,
} from '../../../components/interfaces/api.interface';
import { BoardService } from '../../../components/board/board.service';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../../components/contact/contact.service';
import { ModulesService } from '../../../services/modules.service';

@Component({
  selector: 'app-title-description-section',
  standalone: true,
  imports: [SearchContactComponent, FormsModule, CommonModule],
  templateUrl: './title-description-section.component.html',
  styleUrl: './title-description-section.component.scss',
})
export class TitleDescriptionSectionComponent implements OnInit {
  person_name: string = '';
  contacts: Contact[] = [];
  all_contacts: Contact[] = [];
  token: string | null = null;
  userData: User[] = [];
  openContacts: boolean = false;
  assigned_to_contacts_list: Contact[] = [];
  editTaskData: boolean = false;
  isEditingData: boolean = false;
  toEditTask: Task | null = null;
  errorCreateTask: {
    title: string[] | null | undefined;
    due_date: string[] | null | undefined;
    category: string[] | null | undefined;
  } = {
    title: undefined,
    due_date: undefined,
    category: undefined,
  };

  private modulesService = inject(ModulesService);
  private contactService = inject(ContactService);

  task = {
    title: '',
    description: '',
    assign_to: '',
  };

  constructor(
    private taskService: TaskService,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.taskService.openContacts$.subscribe((state) => {
      this.openContacts = state;
    });

    this.taskService.errorCreateTask$.subscribe((values) => {
      this.errorCreateTask = values;
    });

    this.boardService.editTaskData$.subscribe((state) => {
      this.isEditingData = state;
    });

    this.modulesService.userData$.subscribe((data) => {
      this.userData = data;
      this.contacts = data.map((user) => user.contacts).flat();
      this.all_contacts = data.map((user) => user.contacts).flat();
    });

    this.contactService.assignContactArray$.subscribe((arr) => {
      this.assigned_to_contacts_list = arr;
    });

    this.taskService.task$.subscribe((data) => {
      this.toEditTask = data;
    });

    this.onEditingTaskData(this.toEditTask!);
  }

  onNameInitials(name: string) {
    return this.modulesService.getNameInitials(name);
  }

  onOpenContact() {
    this.taskService.emitOpenContact();
  }

  getUpdatedData() {
    this.token = sessionStorage.getItem('token');
    if (this.token) {
      this.boardService.fetchUserData('accounts/', this.token);
    }
  }

  onEditingTaskData(data: Task) {
    if (this.isEditingData) {
      this.task.title = data.title!;
      this.task.description = data.description!;
      this.assigned_to_contacts_list = data.assigned_to!;
    }
  }

  getTitleDescData() {
    return {
      title: this.task.title,
      description: this.task.description,
      assign_to: this.assigned_to_contacts_list.map((contact) => contact.id),
    };
  }

  resetTitleDescData() {
    this.task.title = '';
    this.task.description = '';
    this.assigned_to_contacts_list = [];
  }

  handleOpenOnSearch() {
    this.contacts = this.all_contacts.filter(
      (contact) =>
        this.onFilterContact(contact, this.task.assign_to, 0) ||
        this.onFilterContact(contact, this.task.assign_to, 1)
    );

    if (
      this.contacts.length !== 0 &&
      this.task.assign_to &&
      this.task.assign_to !== ' '
    ) {
      this.taskService.emitShowContact(true);
    } else {
      this.taskService.emitShowContact(false);
    }
  }

  onFilterContact(contact: Contact, searchName: string, index: number) {
    return (
      contact.name
        .split(' ')
        [index]?.toLowerCase()
        .substring(0, searchName.length) === searchName.toLowerCase()
    );
  }
}
