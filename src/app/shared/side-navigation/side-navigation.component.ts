import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss',
})
export class SideNavigationComponent {}
