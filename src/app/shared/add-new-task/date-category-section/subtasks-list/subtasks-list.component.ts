import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subtasks-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subtasks-list.component.html',
  styleUrl: './subtasks-list.component.scss',
})
export class SubtasksListComponent {
  @Input() subtasks: { description: string }[] = [];
  chosenIndex!: number;
  BASE_SRC: string = 'assets/icons/';

  handleChosen(index: number) {
    this.chosenIndex = index;
  }

  onDeleteSubtask(id: string, index: number) {
    const element = document.getElementById(id) as HTMLElement;

    if (element) {
      const src = element.getAttribute('src');

      if (src === this.BASE_SRC + 'delete.svg') {
        this.subtasks.splice(index, 1);
      }
    }
  }
  onUpdateSubtask(id: string, index: number, newValue: string) {
    const element = document.getElementById(id) as HTMLElement;

    if (element) {
      const src = element.getAttribute('src');

      if (src === this.BASE_SRC + 'subtasks_check.svg') {
        this.subtasks = this.reassign(this.subtasks, index, newValue);
      }
    }
    this.handleChosen(-1);
  }

  reassign(obj: { description: string }[], index: number, newValue: string) {
    obj[index].description = newValue;
    if (!newValue) {
      obj[index].description = newValue;
    }
    return obj;
  }
}
