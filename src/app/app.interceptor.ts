import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from './store/reducers/index';
import { setError, setLoading } from './store/actions/app.actions';

export class AppInterceptor implements HttpInterceptor {
    constructor(
      private store: Store<AppState>,
    ) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        Promise.resolve(null).then(() => {
          this.store.dispatch(setLoading({ loading: true }));
          this.store.dispatch(setError({ error: null }));
        } );
        return next.handle(request)
        .pipe(
          catchError((response: HttpErrorResponse) => {
            this.store.dispatch(setError({ error: response.error.message ||  'Server Error' }));
            return throwError(response);
          }),
          finalize(() => this.store.dispatch(setLoading({ loading: false })))
        );
    }

}


