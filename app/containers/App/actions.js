import {
  GET_GENRES,
  GET_GENRES_SUCCESS,
  GET_GENRES_FAIL,
  ADD_FAVORITE,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAIL,
  GET_FAVORITES,
  GET_FAVORITES_SUCCESS,
  GET_FAVORITES_FAIL,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
} from './constants';

export function getGenders(payload) {
  return {
    type: GET_GENRES,
    payload,
  };
}

export function getGendersSuccess(payload) {
  return {
    type: GET_GENRES_SUCCESS,
    payload,
  };
}

export function getGendersFail(payload) {
  return {
    type: GET_GENRES_FAIL,
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

export function sendMessage(payload) {
  return {
    type: SEND_MESSAGE,
    payload,
  };
}

export function sendMessageSuccess(payload) {
  return {
    type: SEND_MESSAGE_SUCCESS,
    payload,
  };
}

export function sendMessageFail(payload) {
  return {
    type: SEND_MESSAGE_FAIL,
    payload,
  };
}
