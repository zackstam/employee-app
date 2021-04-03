import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from '../services/employee.service';

@Injectable()
export class EmployeeIdResolver implements Resolve<any> {

  constructor(
    private employeeService: EmployeeService
  ) { }
  resolve(route: ActivatedRouteSnapshot): Observable<any>|Promise<any>|any {
    const paramId = 'id';
    const id = route.params[paramId];
    return this.employeeService.byId(id);
  }
}
