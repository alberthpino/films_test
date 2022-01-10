import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_MOVIES_GENRE } from './constants';
import { getMoviesGenreSuccess, getMoviesGenreFail } from './actions';
import { getMoviesGenre } from '../../utils/storage';

function* getMoviesGenreSaga(action) {
  try {
    const movies = yield call(getMoviesGenre, action.payload);
    yield put(getMoviesGenreSuccess(movies));
  } catch (error) {
    yield put(getMoviesGenreFail(error));
  }
}

export default function* genrePageSaga() {
  yield takeLatest(GET_MOVIES_GENRE, getMoviesGenreSaga);
}
