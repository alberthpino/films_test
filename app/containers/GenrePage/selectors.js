import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the genrePage state domain
 */

const selectGenrePageDomain = state => state.genrePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GenrePage
 */

export const makeSelectMoviesGenre = () =>
  createSelector(
    selectGenrePageDomain,
    state => state.get('movies'),
  );

export const makeSelectIsLoadingMoviesGenre = () =>
  createSelector(
    selectGenrePageDomain,
    state => state.get('isLoadingMovies'),
  );

export const makeSelectTotalMoviesGenre = () =>
  createSelector(
    selectGenrePageDomain,
    state => state.get('totalMovies'),
  );

export { selectGenrePageDomain };
