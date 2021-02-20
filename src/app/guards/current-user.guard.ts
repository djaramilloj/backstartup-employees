import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserGuard implements CanActivate {

  constructor(
    private storageService: StorageService,
    private router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.storageService.currentUser) {
      if (this.storageService.getUserData() !== null && this.storageService.getUserData() !== undefined) {
        this.storageService.currentUser = this.storageService.getUserData();
        return true;
      } else {
        this.router.navigateByUrl('/auth');
        return false;
      }
    }
  }
  
}
