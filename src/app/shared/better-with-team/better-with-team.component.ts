import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-better-with-team',
  standalone: true,
  imports: [],
  templateUrl: './better-with-team.component.html',
  styleUrl: './better-with-team.component.scss',
})
export class BetterWithTeamComponent {
  @Input({ required: true }) title!: string;
}
