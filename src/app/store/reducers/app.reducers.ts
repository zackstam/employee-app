import {
  Action,
  createReducer,
  on
} from '@ngrx/store';
import * as AuthActions from '../actions/app.actions';

export interface State {
  error: string | null;
  isLoading: boolean;
  authenticated: boolean;
}

export const initialState: State = {
  error: null,
  isLoading: false,
  authenticated: localStorage.getItem('user') ? true : false,
};


const appReducer = createReducer(
  initialState,
  on(AuthActions.setError, (state, payload: { error: string | null }) => ({
    ...state,
    error: payload.error
  })),
  on(AuthActions.setLoading, (state, payload: { loading: boolean }) => ({
    ...state,
    isLoading: payload.loading
  })),
  on(AuthActions.login, state => ({
    ...state,
    authenticated: true
  })),
  on(AuthActions.logout, state => ({
    ...state,
    authenticated: false
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return appReducer(state, action);
}
