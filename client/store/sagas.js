import { all } from 'redux-saga/effects';
import { watchShows } from './show.js';

export default function* rootSaga() {
  yield all([
    watchShows()
  ])
}