import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromApp from './app.reducers';



export interface AppState {
  app: fromApp.State;
}

export const reducers: ActionReducerMap <AppState> = {
  app: fromApp.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = [];

export const selectApp = (state: AppState) => state.app;

