import { Directive, ElementRef } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { User } from '../models/types';

@Directive({
  selector: '[admin]'
})
export class AdminAuthorizationDirective {

  constructor(
    public element: ElementRef,
    private storageService: StorageService
  ) {
    const currentUser: User = this.storageService.getUserData();
    if (!currentUser.admin) {
      element.nativeElement.style.display = 'none';
    }
  }
}
