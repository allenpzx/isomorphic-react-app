import { all } from 'redux-saga/effects';
import { watchShows } from './show.js';
import { watchAsyncCounter } from './counter.js';

export default function* rootSaga() {
  yield all([
    watchShows(),
    watchAsyncCounter()
  ])
}