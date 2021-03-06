/* global fetch */

import { delay } from 'redux-saga';
import { all, call, put, take, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';

import { actionTypes, failure, loadDataSuccess } from './actions';

es6promise.polyfill();

function* loadDataSaga() {
  try {
    const res = yield fetch('https://jsonplaceholder.typicode.com/posts');
    const data = yield res.json();
    yield put(loadDataSuccess(data));
  } catch (err) {
    yield put(failure(err));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(actionTypes.LOAD_DATA, loadDataSaga)
  ]);
}

export default rootSaga;
