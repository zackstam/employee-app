import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../../../../interfaces/employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../../../../services/employee.service';
import { AppState } from '../../../../../store/reducers/index';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Group } from '../../../../../../app/interfaces/group';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { startWith } from 'rxjs/operators';
import { selectLoading } from '../../../../../store/selectors/app.selector';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit {
  employee: Employee;
  form: FormGroup;
  emailPattern = '^[a-z0-9A-Z._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$';
  salaryPattern = '^[0-9]*$';
  isLoading$: Observable<boolean>;
  errorMessage: string | null;
  max: Date = new Date();
  groups: Group[];
  options: Group[];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(selectLoading));
    this.employee = this.route.snapshot.data['employee'];
    this.groups = this.route.snapshot.data['groups'];
    //create form
    this.form = this.fb.group({
      id: [this.employee.id, Validators.required],
      username: [this.employee.username, Validators.required],
      firstName: [this.employee.firstName, [Validators.required]],
      lastName: [this.employee.lastName, Validators.required],
      email: [this.employee.email, [Validators.required, Validators.pattern(this.emailPattern)]],
      birthDate: [this.employee.birthDate, Validators.required],
      basicSalary: [this.employee.basicSalary, Validators.required],
      group: [this.employee.group, Validators.required],
      status: [this.employee.status, Validators.required],
      description: [this.employee.description, Validators.required],
    });

    this.form
      .get('group')
      .valueChanges.pipe(debounceTime(500), distinctUntilChanged(), startWith(null))
      .subscribe((data) => {
        this.options = data ? this._filter(data) : this.groups;
      });
  }

  private _filter(value: string): Group[] {
    const filterValue = value.toLowerCase();
    return this.groups.filter((group: Group) => group.name.toLowerCase().includes(filterValue));
  }

  save(): void {
    this.errorMessage = null;
    const employeeForm = this.form.value;
    employeeForm.birthDate = moment(employeeForm.birthDate).format('YYYY-MM-DD');
    this.employeeService.update(employeeForm).subscribe(() => {
      this.router.navigate(['/employees']);
    });
  }
}
