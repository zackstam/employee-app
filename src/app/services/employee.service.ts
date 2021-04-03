import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Employee } from '../interfaces/employee';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesUrl = 'api/employees/';  // URL to web api

  constructor(private http: HttpClient) { }

  all(config: any): Observable<any> {
    const params = new HttpParams()
    .set('page', config.pageIndex.toString())
    .set('limit', config.limit.toString());

    const start = (config.limit * config.pageIndex);
    const end = start + config.limit;

    return this.http.get<any>(this.employeesUrl)
    .pipe(
      map((employees: Employee[]) => {
        return {
          length: employees.length,
          pageIndex: config.pageIndex,
          limit: config.limit,
          data: employees.slice(start, end)
        };
      }),
    )
  }

  byId(id: string): Observable<any> {
    return this.http.get<any[]>(this.employeesUrl + id)
  }

  add(employee: Employee): Observable<any> {
    return this.http.post<any[]>(this.employeesUrl, employee)
  }

  update(employee: Employee): Observable<any> {
    return this.http.post<any[]>(this.employeesUrl, employee)
  }

  errorHandler(response: any): Observable<any> {
    return throwError(response.error.message || 'Server Error');
  }
}
