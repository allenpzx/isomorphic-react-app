import { takeEvery, put, delay } from 'redux-saga/effects';
const initialState = 0;
const counter = (state = initialState, action) => {
    switch(action.type){
        case 'ADD':
            return state+1
        case 'SUBTRACT':
            return state-1
        default:
            return state
    }
}
const setCounter = dispatch => operation => {
    dispatch({type: operation});
};

function* delayAdd() {
  yield delay(1000)
  yield put({ type: 'ADD' })
}

function* watchAsyncCounter(){
    try{
        yield takeEvery('DELAY_ADD', delayAdd);
    }catch(e){
        throw e
    }
}
export {counter, setCounter, watchAsyncCounter}