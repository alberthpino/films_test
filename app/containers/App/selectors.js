import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAppDomain = state => state.app || initialState;

export const makeSelectGenres = () =>
  createSelector(
    selectAppDomain,
    state => state.get('genres'),
  );

export const makeSelectIsLoadingFavorites = () =>
  createSelector(
    selectAppDomain,
    state => state.get('isLoadingFavorites'),
  );

export const makeSelectFavorites = () =>
  createSelector(
    selectAppDomain,
    state => state.get('favorites'),
  );

export const makeSelectIsLoadingSendMessage = () =>
  createSelector(
    selectAppDomain,
    state => state.get('isLoadingMessage'),
  );

export { selectAppDomain };
