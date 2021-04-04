import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../../../services/employee.service';
import * as moment from 'moment';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../../store/reducers/index';
import { selectLoading } from '../../../../../store/selectors/app.selector';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, fromEvent } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { startWith } from 'rxjs/operators';
import { Group } from 'src/app/interfaces/group';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  emailPattern = '^[a-z0-9A-Z._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$';
  salaryPattern = '^[0-9]*$';
  isLoading$: Observable<boolean>;
  errorMessage: string | null;
  groups: Group[];
  options: Group[];
  max: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(selectLoading));
    const groups = 'groups';
    this.groups = this.route.snapshot.data[groups];
    this.form = this.fb.group({
      id: [Date.now().toString()],
      username: [null, Validators.required],
      firstName: [null, [Validators.required]],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailPattern)]],
      birthDate: [null, Validators.required],
      basicSalary: [null, Validators.required],
      group: [null, Validators.required],
      status: ['single', Validators.required],
      description: [null, Validators.required],
    });

    this.form.get('group').valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      startWith(null),
    ).subscribe((data) => {
      this.options = data ? this._filter(data) : this.groups;
    });

  }

  private _filter(value: string): Group[] {
    const filterValue = value.toLowerCase();
    return this.groups.filter((group: Group) => group.name.toLowerCase().includes(filterValue));
  }

  ngAfterViewInit() {
  }

  save(): void {
    const employeeForm = this.form.value;
    employeeForm.birthDate = moment(employeeForm.birthDate).format('YYYY-MM-DD')

    this.employeeService.add(employeeForm)
    .subscribe(() => {
      this.router.navigate(['/employees']);
    })
  }

  test() {
    this.employeeService.validateEmail('zackstam@gmail.com')
    .subscribe(data => console.log(data))
  }

}
