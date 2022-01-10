/*
 *
 * FavoritesPage reducer
 *
 */
import { fromJS } from 'immutable';
import {
  GET_FAVORITES,
  GET_FAVORITES_SUCCESS,
  GET_FAVORITES_FAIL,
} from './constants';

export const initialState = fromJS({
  movies: [],
  isLoadingMovies: false,
});

const favoritesPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVORITES:
      return state.set('isLoadingMovies', true);
    case GET_FAVORITES_SUCCESS:
      return state.set('isLoadingMovies', false).set('movies', action.payload);
    case GET_FAVORITES_FAIL:
      return state.set('isLoadingMovies', false);
    default:
      return state;
  }
};

export default favoritesPageReducer;
