import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../interfaces/api.interface';
import { ApiService } from '../../../services/api.service';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  openCategories: boolean = false;
  categories: Category[] = [];
  chosenCategory: string = '';
  constructor(
    private apiService: ApiService,
    private taskService: TaskService
  ) {}
  ngOnInit(): void {
    this.taskService.categories$.subscribe((category) => {
      this.categories = category;
    });

    this.taskService.openCategories$.subscribe((state) => {
      this.openCategories = state;
    });
  }

  getCategory(category: string) {
    this.chosenCategory = category;
    this.taskService.emitCategory(this.chosenCategory);
    this.taskService.emitOpenCategories();
  }
}
