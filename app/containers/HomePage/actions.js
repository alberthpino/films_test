/*
 *
 * HomePage actions
 *
 */

import {
  GET_MOVIES,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAIL,
  ADD_FAVORITE,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAIL,
  GET_FAVORITES,
  GET_FAVORITES_SUCCESS,
  GET_FAVORITES_FAIL,
} from './constants';

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

export function addFavorite(payload) {
  return {
    type: ADD_FAVORITE,
    payload,
  };
}

export function addFavoriteSuccess(payload) {
  return {
    type: ADD_FAVORITE_SUCCESS,
    payload,
  };
}

export function addFavoriteFail(payload) {
  return {
    type: ADD_FAVORITE_FAIL,
    payload,
  };
}

export function getFavorites(payload) {
  return {
    type: GET_FAVORITES,
    payload,
  };
}

export function getFavoritesSuccess(payload) {
  return {
    type: GET_FAVORITES_SUCCESS,
    payload,
  };
}

export function getFavoritesFail(payload) {
  return {
    type: GET_FAVORITES_FAIL,
    payload,
  };
}
