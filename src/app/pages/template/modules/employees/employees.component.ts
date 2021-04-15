import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeeService } from '../../../../services/employee.service';
import { Employee } from '../../../../interfaces/employee';
import { startWith, tap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupsService } from '../../../../services/group.service';
import { ConfigPagination } from '../../../../interfaces/config-pagination';
import { Group } from '../../../../interfaces/group';
import { ResponsePagination } from 'src/app/interfaces/response-pagination';
import { MatDialog } from '@angular/material/dialog';
import { DetailEmployeeComponent } from './detail-employee/detail-employee.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'birthDate', 'action'];
  dataSource: Employee[] = [];
  searchForm: FormGroup;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  groups: Group[];

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private groupService: GroupsService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      group: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.groupService.all().subscribe((data: Group[]) => (this.groups = data));
  }

  ngAfterViewInit(): void {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith(null),
        tap(() => {
          this.getEmployees();
        })
      )
      .subscribe();
  }

  getEmployees(): void {
    const config: ConfigPagination = {
      pageIndex: this.paginator.pageIndex,
      limit: this.paginator.pageSize,
      search: this.searchForm.value,
      sort: {
        field: this.sort.active ? this.sort.active : null,
        order: this.sort.direction,
      },
    };

    this.employeeService.all(config).subscribe((response: ResponsePagination) => {
      this.paginator.length = response.length;
      this.dataSource = response.data;
    });
  }

  detail(employee: Employee): void {
    const dialogRef = this.dialog.open(DetailEmployeeComponent, {
      data: employee,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe();
  }

  search(): void {
    this.paginator.pageIndex = 0;
    this.getEmployees();
  }

  edit(employee: Employee): void {
    this.router.navigate(['/employees/edit', employee.id]);
  }

  reset(): void {
    this.paginator.pageIndex = 0;
    this.searchForm.reset();
  }

  delete(employee: Employee): void {
    this.employeeService.delete(employee.id).subscribe(() => this.getEmployees());
  }
}
