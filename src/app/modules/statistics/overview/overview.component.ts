import { Component, OnInit } from '@angular/core';
import { Statistic } from '../../../models/types';
import { StorageService } from '../../../services/storage.service';
import { HttpService } from '../../../services/http-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public statisticsList: Statistic[] = [];

  constructor(
    private storageService: StorageService,
    private httpService: HttpService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    if (!this.storageService.employeesList) this.getEmployeesData();
    this.calculateStatistics();
  }

  private async getEmployeesData() {
    this.spinner.show();
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
      this.spinner.hide();
    } else {
      this.spinner.hide();
      alert('something went wrong');
    }
  }

  private calculateStatistics() {
    // this.getOlderEmployee();
  }

  // private getOlderEmployee() {
  //   const rta = this.storageService.employeesList.reduce((acc, item) => {
  //     acc[1] = ( acc[1] === undefined || item.employee_age > acc[1] ) ? item.employee_age : acc[1]
  //     return acc;
  //   }, []);
  //   console.log(rta);
  // }
}
