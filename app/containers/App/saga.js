import { takeLatest, call, put } from 'redux-saga/effects';
import {
  GET_GENRES,
  ADD_FAVORITE,
  GET_FAVORITES,
  SEND_MESSAGE,
} from './constants';
import {
  getGendersSuccess,
  getGendersFail,
  addFavoriteSuccess,
  addFavoriteFail,
  getFavoritesSuccess,
  getFavoritesFail,
  sendMessageSuccess,
  sendMessageFail,
} from './actions';
import { getGenres, addFavorite, getFavoriteMovies } from '../../utils/storage';
import { apiSendMessage } from '../../utils/routes';
import { message } from 'antd';

function* getGenresSaga(action) {
  try {
    const genres = yield call(getGenres, action.payload);
    yield put(getGendersSuccess(genres));
  } catch (error) {
    yield put(getGendersFail(error));
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

function* sendMessageSaga(action) {
  try {
    const movies = yield call(apiSendMessage, action.payload);
    yield put(sendMessageSuccess(movies));
    message.success('Message sent');
  } catch (error) {
    yield put(sendMessageFail(error));
  }
}

export default function* appSaga() {
  yield takeLatest(GET_GENRES, getGenresSaga);
  yield takeLatest(ADD_FAVORITE, addFavoriteSaga);
  yield takeLatest(GET_FAVORITES, getFavoritesSaga);
  yield takeLatest(SEND_MESSAGE, sendMessageSaga);
}
