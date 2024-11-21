import { Component } from '@angular/core';
import { ModulesService } from '../../services/modules.service';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss',
})
export class HelpComponent {
  constructor(private moduleService: ModulesService) {}

  onReturn() {
    this.moduleService.handleReturn();
  }
}
