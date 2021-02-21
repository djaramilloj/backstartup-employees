import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../../models/types';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  public currentEmpl: Employee;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    // getting data from browser's history since navigation lyfecycle is closed at this point
    this.currentEmpl = history.state.data;
    if (!this.currentEmpl) {
      this.router.navigateByUrl('/main/home');
    } else {
      this.currentEmpl.profile_image = 'https://source.unsplash.com/veoAiHnM3AI';
    } 
  }

}
