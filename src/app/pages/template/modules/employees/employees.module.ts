import { NgModule, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employees.component';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DetailEmployeeComponent } from './detail-employee/detail-employee.component';
import { EmployeeIdResolver } from '../../../../resolvers/employee-id.resolver';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';


const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent
  },
  {
    path: 'add',
    component: AddEmployeeComponent,
  },
  {
    path: 'edit/:id',
    component: EditEmployeeComponent,
    resolve: {
      employee: EmployeeIdResolver,
    },
  },
  {
    path: ':id',
    component: DetailEmployeeComponent,
  },
];

@NgModule({
  declarations: [EmployeeComponent, DetailEmployeeComponent, AddEmployeeComponent, EditEmployeeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatDialogModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  providers: [
    EmployeeIdResolver,
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'Rp' }
  ],
  entryComponents: []
})
export class EmployeesModule { }
