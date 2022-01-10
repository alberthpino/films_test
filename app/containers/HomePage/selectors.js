import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.homePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomePage
 */

export const makeSelectIsLoadingMovies = () =>
  createSelector(
    selectHomePageDomain,
    state => state.get('isLoadingMovies'),
  );

export const makeSelectMovies = () =>
  createSelector(
    selectHomePageDomain,
    state => state.get('movies'),
  );

export const makeSelectTotalMovies = () =>
  createSelector(
    selectHomePageDomain,
    state => state.get('totalMovies'),
  );

export const makeSelectIsLoadingFavorites = () =>
  createSelector(
    selectHomePageDomain,
    state => state.get('isLoadingFavorites'),
  );

export const makeSelectFavorites = () =>
  createSelector(
    selectHomePageDomain,
    state => state.get('favorites'),
  );

export { selectHomePageDomain };
