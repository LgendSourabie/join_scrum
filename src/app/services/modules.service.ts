import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ModulesService {
  constructor(private location: Location, private router: Router) {}

  getNameInitials(name: string) {
    let nameArray = name?.split(' ');
    let firstName = nameArray?.pop();
    let lastName = nameArray?.join(' ');

    let firstLetter = firstName ? firstName[0]?.toUpperCase() : '';
    let lastLetter = lastName ? lastName[0]?.toUpperCase() : '';
    return `${lastLetter}${firstLetter}`;
  }

  handleReturn(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigateByUrl('dashboard/summary');
    }
  }
}
