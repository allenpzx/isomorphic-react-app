import { put, takeEvery, all } from 'redux-saga/effects';

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

const logTodo = () => {
  console.log('add todo is going [from add todo saga]');
}

export function* watchAddTodo() {
  yield takeEvery('ADD_TODO', logTodo)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
    watchAddTodo()
  ])
}