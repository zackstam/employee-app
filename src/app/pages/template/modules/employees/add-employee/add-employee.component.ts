import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../../../services/employee.service';
import * as moment from 'moment';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../../store/reducers/index';
import { selectError, selectLoading } from '../../../../../store/selectors/app.selector';
import { debounceTime } from 'rxjs/operators';
import { Observable, fromEvent } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  form: FormGroup;
  emailPattern = '^[a-z0-9A-Z._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$';
  salaryPattern = '^[0-9]*$';
  isLoading$: Observable<boolean>;
  errorMessage: string | null;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(selectLoading));
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
  }

  save(): void {
    this.errorMessage = null;
    const employeeForm = this.form.value;
    employeeForm.birthDate = moment(employeeForm.birthDate).format('YYYY-MM-DD')
    this.employeeService.add(employeeForm)
    .subscribe(() => {
      this.router.navigate(['/employees']);
    }, error => {
      this.errorMessage = error;
    })
  }

}
