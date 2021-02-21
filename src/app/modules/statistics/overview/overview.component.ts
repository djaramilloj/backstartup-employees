import { Component, OnInit } from '@angular/core';
import { Statistic, Employee, StatisticType } from '../../../models/types';
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

  async ngOnInit() {
    if (this.storageService.employeesList.length === 0) {
      this.spinner.show();
      await this.getEmployeesData();
    }
    this.calculateStatistics();
  }

  private async getEmployeesData() {
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
    this.getOlderEmployee();
    this.getYoungerEmployee();
    this.getAverageWage();
    this.getEmplWithHigherWage();
    this.getEmplWithLowerWage();
    this.getMostRepetitiveWage();
  }

  private getOlderEmployee() {
    const rta: Employee[] = this.storageService.employeesList.reduce((acc, item) => {
      acc[0] = ( acc[0] === undefined || item.employee_age > acc[0].employee_age ) ? item : acc[0]
      return acc;
    }, []);
    this.statisticsList.push({
      name: StatisticType.OLDER_EMPLOYEE,
      employee: rta[0],
      icon: '../../../../assets/icons/grandfather.png'
    })
  }

  private getYoungerEmployee() {
    const rta: Employee[] = this.storageService.employeesList.reduce((acc, item) => {
      acc[0] = ( acc[0] === undefined || item.employee_age < acc[0].employee_age ) ? item : acc[0]
      return acc;
    }, []);
    this.statisticsList.push({
      name: StatisticType.YOUNGER_EMPLOYEE,
      employee: rta[0],
      icon: '../../../../assets/icons/man.png'
    })
  }

  private getEmplWithHigherWage() {
    const rta: Employee[] = this.storageService.employeesList.reduce((acc, item) => {
      acc[0] = ( acc[0] === undefined || item.employee_salary > acc[0].employee_salary ) ? item : acc[0]
      return acc;
    }, []);
    this.statisticsList.push({
      name: StatisticType.HIGHER_WAGE,
      employee: rta[0],
      icon: '../../../../assets/icons/financial-profit.png',
      onlyAdmin: true
    })
  }

  private getEmplWithLowerWage() {
    const rta: Employee[] = this.storageService.employeesList.reduce((acc, item) => {
      acc[0] = ( acc[0] === undefined || item.employee_salary < acc[0].employee_salary ) ? item : acc[0]
      return acc;
    }, []);
    this.statisticsList.push({
      name: StatisticType.LOWER_WAGE,
      employee: rta[0],
      icon: '../../../../assets/icons/money_lower.png',
      onlyAdmin: true
    })
  }

  private getAverageWage() {
    const rta: number | Employee = this.storageService.employeesList.reduce((acc, item) => {
      return acc = (acc === 0) ? item.employee_salary : (acc + item.employee_salary);
    }, 0);
    this.statisticsList.push({
      name: StatisticType.AVERAGE_WAGE,
      value: rta,
      icon: '../../../../assets/icons/average.png',
      onlyAdmin: true
    })
  }

  private getMostRepetitiveWage() {
    const rta: any = this.storageService.employeesList.reduce((acc, item) => {
      if (acc === {} || !acc[item.employee_salary]) {
        acc[item.employee_salary] = 1;
        return acc;
      } else if (acc[item.employee_salary]) {
        acc[item.employee_salary] = acc[item.employee_salary] + 1;
        return acc;
      }
    }, {});
    let maxElement;
    for (let el in rta) {
      if (!maxElement) maxElement = el;
      if (rta[el] > rta[maxElement]) maxElement = el;
    }
    this.statisticsList.push({
      name: StatisticType.MOST_COMMON_WAGE,
      value: maxElement,
      icon: '../../../../assets/icons/common.png'
    })
  }
}
