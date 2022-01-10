import { takeLatest } from 'redux-saga/effects';

function* closeSesionSaga(action) {}

export default function* appSaga() {
  yield takeLatest(CLOSE_SESION, closeSesionSaga);
}
