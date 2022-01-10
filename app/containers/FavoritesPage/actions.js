/*
 *
 * FavoritesPage actions
 *
 */

import {
  GET_FAVORITES,
  GET_FAVORITES_SUCCESS,
  GET_FAVORITES_FAIL,
} from './constants';

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
