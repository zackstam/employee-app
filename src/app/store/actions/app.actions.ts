import { createAction, props } from '@ngrx/store';

export const setError = createAction('SET_ERROR', props<{error: string | null}>());
export const setLoading = createAction('SET_LOADING', props<{loading: boolean}>());
export const login = createAction('LOGIN');






