import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/types';
import { StorageService } from '../../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  public toggled: boolean = false;
  public currentUser: User;
  constructor(
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.currentUser;
  }

  logOut() {
    this.storageService.deleteUserData();
    this.router.navigateByUrl('/auth');
    window.location.reload();
  }
}
