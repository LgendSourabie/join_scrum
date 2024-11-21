import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {
  @Input({ required: true }) text!: string;
  @Input({ required: true }) icon!: string;

  getIconPath() {
    return 'assets/icons/' + this.icon;
  }
}
