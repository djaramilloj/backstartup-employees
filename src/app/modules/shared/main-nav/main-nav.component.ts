import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/types';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  public toggled: boolean = false;
  public currentUser: User;
  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.currentUser;
  }

}
