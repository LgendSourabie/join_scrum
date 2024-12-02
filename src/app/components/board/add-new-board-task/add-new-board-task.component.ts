import { Component, OnInit } from '@angular/core';
import { ContactDialogWrapperComponent } from '../contact-dialog-wrapper/contact-dialog-wrapper.component';
import { AddNewTaskComponent } from '../../../shared/add-new-task/add-new-task.component';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-add-new-board-task',
  standalone: true,
  imports: [AddNewTaskComponent, ContactDialogWrapperComponent],
  templateUrl: './add-new-board-task.component.html',
  styleUrl: './add-new-board-task.component.scss',
})
export class AddNewBoardTaskComponent implements OnInit {
  newTask: boolean = false;

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.boardService.newTask$.subscribe((state) => {
      this.newTask = state;
    });
  }

  onCloseAddTask() {
    this.boardService.newTaskState(false);
  }
}
