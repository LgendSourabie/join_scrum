import { Component, Input, inject } from '@angular/core';
import { Subtask, Task } from '../../interfaces/api.interface';
import { ModulesService } from '../../../services/modules.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-task.component.html',
  styleUrl: './single-task.component.scss',
})
export class SingleTaskComponent {
  private moduleService = inject(ModulesService);

  @Input({ required: true }) task!: Task;

  onNameInitials(name: string) {
    return this.moduleService.getNameInitials(name);
  }

  getCompletedSubtask(subtasks: Subtask[]) {
    return subtasks.filter((subtask) => subtask.is_completed === true);
  }
}
