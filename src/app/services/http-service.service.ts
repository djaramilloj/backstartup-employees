import { Injectable } from '@angular/core';
import { Configs } from '../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getEmployees() {
    const api_url = `${Configs.API_URL}/employees`
    const req = this.httpClient.get(api_url);
    return req;
  }

  deleteEmployee(id: number) {
    const api_url = `${Configs.API_URL}/delete/${id}`
    const req = this.httpClient.delete(api_url);
    return req;
  }

  addEmployee(data: Employee) {
    const api_url = `${Configs.API_URL}/create`;
    const req =  this.httpClient.post(api_url, JSON.stringify(data));
    return req;
  }
}
