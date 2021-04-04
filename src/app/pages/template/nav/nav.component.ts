import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../store/reducers/index';
import { logout } from '../../../store/actions/app.actions';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
    localStorage.removeItem('user');
  }

}
