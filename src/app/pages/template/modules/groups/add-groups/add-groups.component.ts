import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../../store/reducers/index';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GroupsService } from '../../../../../services/group.service';
import { selectLoading } from '../../../../../store/selectors/app.selector';

@Component({
  selector: 'app-add-groups',
  templateUrl: './add-groups.component.html',
  styleUrls: ['./add-groups.component.scss'],
})
export class AddGroupsComponent implements OnInit {
  form: FormGroup;
  isLoading$: Observable<boolean>;
  errorMessage: string | null;

  constructor(private store: Store<AppState>, private router: Router, private groupService: GroupsService) {}

  get groupsForm() {
    return this.form.get('groups') as FormArray;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(selectLoading));
    this.form = new FormGroup({
      groups: new FormArray([]),
    });
    this.createGroup();
  }

  remove(i: number): void {
    (<FormArray>this.form.get('groups')).removeAt(i);
  }

  createGroup(): void {
    const control = new FormGroup({
      id: new FormControl(Date.now().toString()),
      name: new FormControl(null, Validators.required),
    });
    (<FormArray>this.form.get('groups')).push(control);
  }

  save(): void {
    const groups = this.form.get('groups').value;
    for (const group of groups) {
      this.groupService.add(group).subscribe(() => {
        this.router.navigate(['/groups']);
      });
    }
  }
}
