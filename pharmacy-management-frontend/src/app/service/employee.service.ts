import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../model/Employee";
const API_URL = 'http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:max-line-length
  findEmployeeByRequest(employeeName: string, employeeAddress: string, employeeCode: string, employeePhone: string, position: string, page: number, sortBy: string): Observable<Employee[]> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Employee[]>(API_URL + '/employee' + '?employeeName=' + employeeName + '&employeeAddress=' + employeeAddress + '&employeeCode=' + employeeCode + '&employeePhone=' + employeePhone + '&position=' + position + '&page=' + page + '&sortBy=' + sortBy);
  }

  // @ts-ignore
  deleteEmployeeByRequest(employeeId: number): Observable<Employee> {
    return this.http.delete<Employee>(API_URL + '/employee/delete?id=' + employeeId);
  }
  save(id: number, data: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${API_URL}/employee/${id}`, data);
  }
  saveEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(API_URL + '/employee/create', employee);
  }

  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${API_URL}/employee/${id}`);
  }
}
