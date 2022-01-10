/*
 *
 * MoviesPage reducer
 *
 */
import { fromJS } from 'immutable';
import { GET_MOVIES, GET_MOVIES_SUCCESS, GET_MOVIES_FAIL } from './constants';

export const initialState = fromJS({
  isLoadingMovies: false,
  totalMovies: 0,
  movies: [],
});

/* eslint-disable default-case, no-param-reassign */
const moviesPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return state.set('isLoadingMovies', true);
    case GET_MOVIES_SUCCESS:
      return state
        .set('isLoadingMovies', false)
        .set('totalMovies', action.payload.rows)
        .set('movies', action.payload.results);
    case GET_MOVIES_FAIL:
      return state.set('isLoadingMovies', false);
    default:
      return state;
  }
};

export default moviesPageReducer;
