/*
 *
 * HomePage reducer
 *
 */
import { fromJS } from 'immutable';
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

export const initialState = fromJS({
  movies: [],
  totalMovies: 0,
  isLoadingMovies: false,
  isLoadingAddFavorites: false,
  favorites: [],
  isLoadingFavorites: [],
});

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default homePageReducer;
