import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the moviesPage state domain
 */

const selectMoviesPageDomain = state => state.moviesPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MoviesPage
 */

export const makeSelectIsLoadingMovies = () =>
  createSelector(
    selectMoviesPageDomain,
    state => state.get('isLoadingMovies'),
  );

export const makeSelectMovies = () =>
  createSelector(
    selectMoviesPageDomain,
    state => state.get('movies'),
  );

export const makeSelectTotalMovies = () =>
  createSelector(
    selectMoviesPageDomain,
    state => state.get('totalMovies'),
  );

export { selectMoviesPageDomain };
