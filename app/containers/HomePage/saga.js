import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_MOVIES, ADD_FAVORITE, GET_FAVORITES } from './constants';
import {
  getMoviesSuccess,
  getMoviesFail,
  addFavoriteSuccess,
  addFavoriteFail,
  getFavoritesSuccess,
  getFavoritesFail,
} from './actions';
import {
  getMoviesStore,
  addFavorite,
  getFavoriteMovies,
} from '../../utils/storage';

function* getMoviesSaga(action) {
  try {
    const movies = yield call(getMoviesStore, action.payload);
    yield put(getMoviesSuccess(movies));
  } catch (error) {
    yield put(getMoviesFail(error));
  }
}

function* addFavoriteSaga(action) {
  try {
    const movies = yield call(addFavorite, action.payload);
    yield put(addFavoriteSuccess(movies));
  } catch (error) {
    yield put(addFavoriteFail(error));
  }
}

function* getFavoritesSaga(action) {
  try {
    const movies = yield call(getFavoriteMovies, action.payload);
    yield put(getFavoritesSuccess(movies));
  } catch (error) {
    yield put(getFavoritesFail(error));
  }
}

export default function* homePageSaga() {
  yield takeLatest(GET_MOVIES, getMoviesSaga);
  yield takeLatest(ADD_FAVORITE, addFavoriteSaga);
  yield takeLatest(GET_FAVORITES, getFavoritesSaga);
}
