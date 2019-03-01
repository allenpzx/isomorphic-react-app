import { take, put, call, fork, cancel, cancelled, delay } from 'redux-saga/effects';

function* fetchShows (){
    try{
        yield put({type: 'FETCH_SHOWS_START'})
    }catch(e){
        yield put({type: 'GET_ERROR', payload: e});
    }finally{

    }
}

export default function* watchFetchShows(){
    while(yield take('GET_SHOWS_START')){
        const fetchShowTask = yield folk(fetchShows);
        const res = yield take('STOP_FETCH_SHOwS');
    }
}