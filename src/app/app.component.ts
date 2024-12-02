import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardService } from './components/board/board.service';
import { TaskService } from './components/task/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'join_scrum';
  isLoading: boolean = true;

  token: string | null = null;

  constructor(
    private boardService: BoardService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.getUpdatedData();
    this.getUpdatedCategories();
  }

  getUpdatedData() {
    this.token = sessionStorage.getItem('token');
    if (this.token) {
      this.boardService.fetchUserData('accounts/', this.token);
    }
  }

  getUpdatedCategories() {
    this.token = sessionStorage.getItem('token');
    if (this.token) {
      this.taskService.fetchCategories('category_options/', this.token);
    }
  }
}
