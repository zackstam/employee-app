import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupsService } from '../../../../../services/group.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../../store/reducers/index';
import { selectLoading } from '../../../../../store/selectors/app.selector';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss'],
})
export class EditGroupComponent implements OnInit {
  form: FormGroup;
  isLoading$: Observable<boolean>;
  constructor(
    public dialogRef: MatDialogRef<EditGroupComponent>,
    private groupService: GroupsService,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(selectLoading));
    this.form = new FormGroup({
      id: new FormControl(this.data.id, Validators.required),
      name: new FormControl(this.data.name, Validators.required),
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    const form = this.form.value;
    this.groupService.update(form).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
