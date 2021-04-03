import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EmployeeService } from '../../../../../services/employee.service';
import { Employee } from '../../../../../interfaces/employee';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.scss']
})
export class DetailEmployeeComponent implements OnInit, AfterViewInit {
  employee: Employee | null;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.route.params
    .pipe(
      mergeMap((params: Params) => {
        return this.employeeService.byId(params.id)
      })
    ).subscribe(data => this.employee = data)

  }

}
