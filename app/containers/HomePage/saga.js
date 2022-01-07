import { takeLatest, call, put } from 'redux-saga/effects';
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

export default function* homePageSaga() {
  yield takeLatest(GET_MOVIES, getMoviesSaga);
}
