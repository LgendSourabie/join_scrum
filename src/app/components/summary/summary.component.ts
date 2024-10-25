import { Component } from '@angular/core';
import { BetterWithTeamComponent } from '../../shared/better-with-team/better-with-team.component';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [BetterWithTeamComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {}
