import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Contact, User } from '../../interfaces/api.interface';
import { ModulesService } from '../../../services/modules.service';
import { ContactService } from '../../contact/contact.service';
import { BoardService } from '../../board/board.service';

@Component({
  selector: 'app-search-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-contact.component.html',
  styleUrl: './search-contact.component.scss',
})
export class SearchContactComponent {
  private taskService = inject(TaskService);
  private modulesService = inject(ModulesService);

  token: string | null = null;
  userData: User[] = [];
  showSearchUserName: boolean = false;
  openContacts: boolean = false;
  selectedIndexArray: number[] = [];
  selectedContactArray: Contact[] = [];
  isEditingData: boolean = false;
  @Input({ required: true }) contacts!: Contact[];

  constructor(
    private contactService: ContactService,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.taskService.openContacts$.subscribe((state) => {
      this.openContacts = state;
    });

    this.boardService.editTaskData$.subscribe((state) => {
      this.isEditingData = state;
      if (this.isEditingData) {
        this.taskService.task$.subscribe((data) => {
          this.selectedContactArray = data?.assigned_to!;
          this.selectedIndexArray = data?.assigned_to?.map(
            (contact) => contact.id
          ) as number[];
        });
      }
    });
  }

  onNameInitials(name: string) {
    return this.modulesService.getNameInitials(name);
  }

  onOpenContact() {
    this.taskService.emitOpenContact();
  }

  onAssignContact(contactId: number, contact: Contact) {
    const selectedIndex = this.selectedIndexArray?.indexOf(contactId);

    if (selectedIndex > -1) {
      this.selectedIndexArray.splice(selectedIndex, 1);

      this.handleRemoveAssign(contact.id!).then(() =>
        this.contactService.emitContactArray(this.selectedContactArray)
      );
    } else {
      this.selectedIndexArray.push(contactId);
      this.handleAddAssign(contact).then(() =>
        this.contactService.emitContactArray(this.selectedContactArray)
      );
    }
  }

  async handleRemoveAssign(id: number) {
    this.selectedContactArray = this.selectedContactArray?.filter(
      (contact) => contact.id !== id
    );
  }

  async handleAddAssign(contact: Contact) {
    this.selectedContactArray?.push(contact);
  }

  onSelectContact(contactId: number) {
    return this.selectedIndexArray?.includes(contactId);
  }
}
