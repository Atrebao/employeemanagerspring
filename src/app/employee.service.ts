import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //private apiServerUrl = environment.apiBaseUrl;

  readonly API_URL ="http://localhost:8090";
  readonly ENDPOINT_EMPLOYEES = "/employee";

  constructor(private http: HttpClient){}
  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.API_URL+this.ENDPOINT_EMPLOYEES}/all`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.API_URL+this.ENDPOINT_EMPLOYEES}/add`, employee);
  }

  public updateEmployee(employee: Employee, data: any): Observable<Employee> {
    return this.http.put<Employee>(`${this.API_URL+this.ENDPOINT_EMPLOYEES}/update`, employee);
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL+this.ENDPOINT_EMPLOYEES}/delete/${employeeId}`);
  }

}
