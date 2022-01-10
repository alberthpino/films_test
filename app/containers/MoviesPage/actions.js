/*
 *
 * MoviesPage actions
 *
 */

import { GET_MOVIES, GET_MOVIES_SUCCESS, GET_MOVIES_FAIL } from './constants';

export function getMovies(payload) {
  return {
    type: GET_MOVIES,
    payload,
  };
}

export function getMoviesSuccess(payload) {
  return {
    type: GET_MOVIES_SUCCESS,
    payload,
  };
}

export function getMoviesFail(payload) {
  return {
    type: GET_MOVIES_FAIL,
    payload,
  };
}
