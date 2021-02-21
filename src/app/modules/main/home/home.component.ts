import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { HttpService } from '../../../services/http-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Employee, Statistic, StatisticType } from '../../../models/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public statisticOverview: Statistic;
  public employeesList: Employee[] = [];

  constructor(
    private storageService: StorageService,
    private httpService: HttpService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.storageService.employeesList.length === 0) {
      this.spinner.show();
      this.getEmployees();
    } else {
      this.employeesList = this.storageService.employeesList;
      this.getOverviewStatistics();
    }
  }

  private async getEmployees() {
    const rta: any = await this.httpService.getEmployees().toPromise(); 
    if (rta.status === 'success') {
      this.storageService.employeesList = rta.data.map(item => {
        return {
          id: parseInt(item.id),
          employee_name: item.employee_name,
          employee_salary: parseInt(item.employee_salary),
          employee_age: parseInt(item.employee_age),
          profile_image: item.profile_image
        }
      })      
      this.employeesList = this.storageService.employeesList;
      this.getOverviewStatistics();
      this.spinner.hide();
    } else {
      this.spinner.hide();
      alert('something went wrong');
    }
  }

  private getOverviewStatistics() {
    const rta: Employee[] = this.storageService.employeesList.reduce((acc, item) => {
      acc[0] = ( acc[0] === undefined || item.employee_age > acc[0].employee_age ) ? item : acc[0]
      return acc;
    }, []);
    this.statisticOverview = {
      name: StatisticType.OLDER_EMPLOYEE,
      employee: rta[0],
      icon: '../../../../assets/icons/grandfather.png'
    }
  }

  goDetails(empl) {
    this.router.navigate([`/main/employees/${empl.id}`], {state: {
      data: empl
    }});
  }

  goStatistics() {
    this.router.navigateByUrl('/statistics');
  }

}
