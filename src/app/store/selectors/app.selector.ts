import { selectApp } from '../reducers/index';

import { createSelector } from '@ngrx/store';

export interface App {
  error: string | null;
  isLoading: boolean;
}

export const selectError = createSelector(
  selectApp, (state: App) => state.error
);

export const selectLoading = createSelector(
  selectApp, (state: App) => state.isLoading
);


