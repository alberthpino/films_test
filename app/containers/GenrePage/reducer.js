/*
 *
 * GenrePage reducer
 *
 */
import { fromJS } from 'immutable';
import {
  GET_MOVIES_GENRE,
  GET_MOVIES_GENRE_SUCCESS,
  GET_MOVIES_GENRE_FAIL,
} from './constants';

export const initialState = fromJS({
  movies: [],
  isLoadingMovies: false,
  totalMovies: 0,
});

const genrePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES_GENRE:
      return state.set('isLoadingMovies', true);
    case GET_MOVIES_GENRE_SUCCESS:
      return state
        .set('isLoadingMovies', false)
        .set('movies', action.payload.results)
        .set('totalMovies', action.payload.rows);
    case GET_MOVIES_GENRE_FAIL:
      return state.set('isLoadingMovies', false);
    default:
      return state;
  }
};

export default genrePageReducer;
