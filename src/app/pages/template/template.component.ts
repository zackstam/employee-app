import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/reducers/index';
import { selectError, selectLoading } from '../../store/selectors/app.selector';
import { debounceTime } from 'rxjs/operators';
import { Observable, fromEvent } from 'rxjs';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  animations: [
    trigger('openMenu', [
      state('open', style({
        width: '250px'
      })),
      state('closed', style({
        width: '0px'
      })),
      transition('open => closed', animate('400ms ease-in-out')),
      transition('closed => open', animate('400ms ease-in-out'))
    ])
  ],
})
export class TemplateComponent implements OnInit, AfterViewInit {
  isMenuOpen = false;
  @ViewChild('menu', { static: false }) menu: ElementRef;
  error$: Observable<string | null>;
  isLoading$: Observable<boolean>;
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.error$ = this.store.pipe(select(selectError));
    this.isLoading$ = this.store.pipe(select(selectLoading));
  }

  ngAfterViewInit(): void {
    this.detectWindowChanges();
  }

  toggleNav(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  detectWindowChanges(): void {
    const windowResize = fromEvent(window, 'resize');
    windowResize.pipe(
      debounceTime(2000)
    ).subscribe((windowElement: any) => {
      if (windowElement.target.innerWidth > 959) {
        this.isMenuOpen = false;
      }
    });
  }


}
