import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Employee } from '../interfaces/employee';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as _ from 'lodash';
import { ConfigPagination } from '../interfaces/config-pagination';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeesUrl = 'api/employees/'; // URL to web api

  constructor(private http: HttpClient) {}

  all(config: ConfigPagination): Observable<any> {
    const params = new HttpParams().set('page', config.pageIndex.toString()).set('limit', config.limit.toString());

    const start = config.limit * config.pageIndex;
    const end = start + config.limit;

    return this.http.get<any>(this.employeesUrl).pipe(
      map((employees: Employee[]) => {
        const filteredEmployees = employees.filter((employee: any) => {
          let firstNameStatus = true;
          let lastNameStatus = true;
          let groupStatus = true;
          const { firstName, lastName, group } = config.search;
          if (firstName) {
            firstNameStatus = employee.firstName.toLowerCase().includes(firstName.toLowerCase()) ? true : false;
          }
          if (lastName) {
            lastNameStatus = employee.lastName.toLowerCase().includes(lastName.toLowerCase()) ? true : false;
          }
          if (group) {
            groupStatus = employee.group.toLowerCase().includes(group.toLowerCase()) ? true : false;
          }
          if (firstNameStatus && lastNameStatus && groupStatus) {
            return employee;
          }
        });
        let orderedEmployees = filteredEmployees;
        const { field, order } = config.sort;
        if (field) {
          orderedEmployees =
            order === 'asc' ? _.orderBy(orderedEmployees, field) : _.orderBy(orderedEmployees, field).reverse();
        }
        return {
          length: orderedEmployees.length,
          pageIndex: config.pageIndex,
          limit: config.limit,
          data: orderedEmployees.slice(start, end),
        };
      })
    );
  }

  validateEmail(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.get<any[]>(this.employeesUrl, { params });
  }

  byId(id: string): Observable<Employee> {
    return this.http.get<Employee>(this.employeesUrl + id);
  }

  add(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl, employee);
  }

  update(employee: Employee): Observable<any> {
    return this.http.put<Employee[]>(this.employeesUrl, employee);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(this.employeesUrl + id);
  }

  errorHandler(response: any): Observable<any> {
    return throwError(response.error.message || 'Server Error');
  }
}
