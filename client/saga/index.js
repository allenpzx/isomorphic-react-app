import { call, put, takeEvery, all } from 'redux-saga/effects';

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* helloSaga() {
  console.log('Hello Sagas!')
}

export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export function* watchDelayAdd() {
  yield takeEvery('DELAY_ADD', function*(){
    yield call(delay, 1000);
    yield put({type: 'ADD'});
    yield console.log('ceshi');
  })
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
    watchDelayAdd()
  ])
}