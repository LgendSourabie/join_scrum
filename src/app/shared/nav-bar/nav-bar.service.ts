import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  private submenuStateSubject = new BehaviorSubject<boolean>(false);
  open_submenu$ = this.submenuStateSubject.asObservable();
  private profileStateSubject = new BehaviorSubject<boolean>(false);
  open_profile$ = this.profileStateSubject.asObservable();
  private editProfileStateSubject = new BehaviorSubject<boolean>(false);
  open_edit_profile$ = this.editProfileStateSubject.asObservable();
  is_menu_open = false;
  is_profile_open = false;
  is_edit_profile_open = false;
  constructor() {}

  emitSubmenuState() {
    this.is_menu_open = !this.is_menu_open;
    this.submenuStateSubject.next(this.is_menu_open);
  }
  emitProfileState() {
    this.is_profile_open = !this.is_profile_open;
    this.profileStateSubject.next(this.is_profile_open);
  }
  emitEditProfileState() {
    this.is_edit_profile_open = !this.is_edit_profile_open;
    this.editProfileStateSubject.next(this.is_edit_profile_open);
  }

  closeSubmenu() {
    this.submenuStateSubject.next(false);
  }
}
