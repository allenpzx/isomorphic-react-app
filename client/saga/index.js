import { select, call, put, takeEvery, take, all } from 'redux-saga/effects';
import watchFetchShows from './show.js';

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

export function* watchState(){
  yield takeEvery('*', function* (action){
    const state = yield select();
    console.log('[action]-', action);
    console.log('[saga is listened the store]-', state);
  })
}

export function* doubleTimeLog(){
  while(true){ // 每两次dispatch触发一次console 如果2次之后的console只执行一次的话, 去掉whild方法
    const res = yield take('*');
    const res2 = yield take('*');

    console.log('finished', res, res2);
  }
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
    watchDelayAdd(),
    watchState(),
    watchFetchShows()
  ])
}