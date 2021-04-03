import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from '../../store/reducers/index';
import { login } from '../../store/actions/app.actions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { selectError, selectLoading } from '../../store/selectors/app.selector';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(selectLoading));
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  submit(): void {
    this.authService.login(this.form.value)
    .subscribe(data => {
      if (data.length > 0) {
        this.store.dispatch(login());
        this.router.navigate(['/home']);
      }

    });
  }

}
