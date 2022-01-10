import { takeLatest, call, put } from 'redux-saga/effects';

import { GET_FAVORITES } from './constants';
import { getFavoritesSuccess, getFavoritesFail } from './actions';
import { getFavoriteMovies } from '../../utils/storage';

function* getFavoritesSaga(action) {
  try {
    const movies = yield call(getFavoriteMovies, action.payload);
    yield put(getFavoritesSuccess(movies));
  } catch (error) {
    yield put(getFavoritesFail(error));
  }
}

export default function* favoritesPageSaga() {
  yield takeLatest(GET_FAVORITES, getFavoritesSaga);
}
