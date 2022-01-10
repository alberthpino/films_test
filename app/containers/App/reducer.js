/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import { fromJS } from 'immutable';
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

// The initial state of the App
export const initialState = fromJS({
  genres: [],
  isLoadingGenres: false,
  isLoadingAddFavorites: false,
  favorites: [],
  isLoadingFavorites: false,
  isLoadingMessage: false,
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GENRES:
      return state.set('isLoadingGenres', true);
    case GET_GENRES_SUCCESS:
      return state.set('isLoadingGenres', false).set('genres', action.payload);
    case GET_GENRES_FAIL:
      return state.set('isLoadingGenres', false);
    case ADD_FAVORITE:
      return state.set('isLoadingAddFavorites', true);
    case ADD_FAVORITE_SUCCESS:
      return state
        .set('isLoadingAddFavorites', false)
        .set('favorites', action.payload);
    case ADD_FAVORITE_FAIL:
      return state.set('isLoadingAddFavorites', false);
    case GET_FAVORITES:
      return state.set('isLoadingFavorites', true);
    case GET_FAVORITES_SUCCESS:
      return state
        .set('isLoadingFavorites', false)
        .set('favorites', action.payload);
    case GET_FAVORITES_FAIL:
      return state.set('isLoadingFavorites', false);
    case SEND_MESSAGE:
      return state.set('isLoadingMessage', true);
    case SEND_MESSAGE_SUCCESS:
      return state.set('isLoadingMessage', false);
    case SEND_MESSAGE_FAIL:
      return state.set('isLoadingMessage', false);
    default:
      return state;
  }
};

export default appReducer;
