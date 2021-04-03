import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../../../services/employee.service';
import { Employee } from '../../../../interfaces/employee';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'birthDate', 'action'];
  dataSource = new MatTableDataSource<Employee>([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private employeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.getEmployees(this.paginator.pageIndex, this.paginator.pageSize);

  }

  changePage(page: any) {
    this.getEmployees(page.pageIndex, page.pageSize)
  }


  getEmployees(pageIndex: number, pageSize: number) {
    const config = {
      pageIndex: pageIndex,
      limit: pageSize,
    };
    this.employeeService.all(config)
    .subscribe((data: any) => {
      this.paginator.length = data.length;
      this.paginator.pageIndex = data.pageIndex;
      this.dataSource = data.data;
    })
  }

}
