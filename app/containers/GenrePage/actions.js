/*
 *
 * GenrePage actions
 *
 */

import {
  GET_MOVIES_GENRE,
  GET_MOVIES_GENRE_SUCCESS,
  GET_MOVIES_GENRE_FAIL,
} from './constants';

export function getMoviesGenre(payload) {
  return {
    type: GET_MOVIES_GENRE,
    payload,
  };
}

export function getMoviesGenreSuccess(payload) {
  return {
    type: GET_MOVIES_GENRE_SUCCESS,
    payload,
  };
}

export function getMoviesGenreFail(payload) {
  return {
    type: GET_MOVIES_GENRE_FAIL,
    payload,
  };
}
