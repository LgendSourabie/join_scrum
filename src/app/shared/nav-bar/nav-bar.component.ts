import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SubmenuComponent } from './submenu/submenu.component';
import { NavBarService } from './nav-bar.service';
import { BoardService } from '../../components/board/board.service';
import { ModulesService } from '../../services/modules.service';
import { ProfileComponent } from '../../components/profile/profile.component';
import { EditProfileComponent } from '../../components/edit-profile/edit-profile.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    SubmenuComponent,
    ProfileComponent,
    EditProfileComponent,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  private boardService = inject(BoardService);
  private moduleService = inject(ModulesService);

  open_submenu: boolean = false;
  userData: any[] = [];
  username: string = '';

  constructor(private navBarService: NavBarService) {}
  ngOnInit(): void {
    this.boardService.userData$.subscribe((data) => {
      this.userData = data;
      this.username = `${this.userData[0]?.first_name} ${this.userData[0]?.last_name}`;
    });
  }

  onToggleSubMenu() {
    this.navBarService.emitSubmenuState();
  }

  getNameInitials() {
    let name;
    if (this.userData.length === 0) {
      name = 'Guest';
    } else {
      name = `${this.userData[0]?.last_name[0]} ${this.userData[0]?.first_name}`;
    }
    return this.moduleService.getNameInitials(name);
  }
}
