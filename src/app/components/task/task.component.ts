import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { AddNewTaskComponent } from '../../shared/add-new-task/add-new-task.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [AddNewTaskComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  constructor(private apiService: ApiService) {}
}
