import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http-service.service';
import { Employee } from '../../../models/types';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  public employeesList: Employee[] = [];
  public selectedEmpl: Employee;
  public employeeForm: FormGroup = new FormGroup({});

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.storageService.employeesList.length === 0) {
      this.spinner.show();
      this.getEmployees();
    } else {
      this.employeesList = this.storageService.employeesList;
    }
    this.employeeForm = this.createFormGroup();
  }

  createFormGroup() {
    return this.fb.group({
        name: ['', [Validators.required]],
        salary: ['', [Validators.required]],
        age: ['', [Validators.required]],
        profile_image: []
    }); 
  }

  private async getEmployees() {
    const rta: any = await this.httpService.getEmployees().toPromise(); 
    if (rta.status === 'success') {
      this.employeesList = rta.data.map(item => {
        return {
          id: parseInt(item.id),
          employee_name: item.employee_name,
          employee_salary: parseInt(item.employee_salary),
          employee_age: parseInt(item.employee_age),
          profile_image: item.profile_image
        }
      })      
      this.storageService.employeesList = this.employeesList;
      this.spinner.hide();
    } else {
      this.spinner.hide();
      alert('something went wrong');
    }
  }

  openModalDelete(modal, empl) {
    this.modalService.open(modal, {ariaLabelledBy: 'deleteModal'})
    .result.then((result) => {}, async (reason) => {
      if (reason !== 'cancel'){
        this.spinner.show();
        try {
          const rta: any = await this.httpService.deleteEmployee(empl.id).toPromise(); 
          if (rta.status === 'success'){
            this.employeesList = this.employeesList.filter(item => {
              if (item.id !== empl.id) {
                return item;
              }
            })
          }        
        } catch(error) {
          console.log(error);
        }
        this.spinner.hide();
      }      
    });
  }

  goDetails(empl) {
    this.selectedEmpl = empl;
    this.router.navigate([`/main/employees/${empl.id}`], {state: {
      data: this.selectedEmpl
    }});
  }

  addEmployee(modal) {
    this.modalService.open(modal, {ariaLabelledBy: 'addModal'})
    .result.then((result) => {}, async (reason) => {
      if (reason !== 'cancel'){
        this.spinner.show();
        try {
          const data: Employee = {
            employee_name: this.employeeForm.get('name').value,
            employee_age: this.employeeForm.get('age').value.toString(),
            employee_salary: this.employeeForm.get('salary').value.toString(),
            profile_image: this.employeeForm.get('profile_image').value
          }
          const rta: any = await this.httpService.addEmployee(data).toPromise();
          console.log(rta);
          if (rta.status === 'success'){
            this.employeesList.push({
              id: rta.data.id,
              ...data
            });
            this.employeeForm.reset();
          } 
        } catch(error) {
          console.log(error);
        }
        this.spinner.hide();
      }      
    });
  }

  onSubmit() {
    console.log('Submit button was hit');
    
  }
}
