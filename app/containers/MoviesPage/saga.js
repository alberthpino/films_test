import { takeLatest, call, put, select } from 'redux-saga/effects';
import { GET_MOVIES } from './constants';
import { getMoviesSuccess, getMoviesFail } from './actions';
import { getMoviesStore } from '../../utils/storage';

function* getMoviesSaga(action) {
  try {
    const movies = yield call(getMoviesStore, action.payload);
    yield put(getMoviesSuccess(movies));
  } catch (error) {
    yield put(getMoviesFail(error));
  }
}

export default function* moviesPageSaga() {
  yield takeLatest(GET_MOVIES, getMoviesSaga);
}
