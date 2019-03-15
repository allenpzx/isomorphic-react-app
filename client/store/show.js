import { call, take, fork, put, cancel, cancelled, delay, takeEvery } from 'redux-saga/effects';

const initialState = {type: 'initial', payload: []};
export const show = (state = initialState, action) => {
    switch(action.type){
        case 'GET_SHOWS_START':
            return {...state, type: 'loading'}
        case 'GET_SHOWS_SUCCESS':
            return {type: 'success', payload: state.payload.concat(action.payload)}
        case 'GET_SHOWS_ERROR':
            return {...state, type: 'error'}
        case 'GET_SHOWS_CANCEL':
            return {...state, type: 'cancel'}
        case 'GET_SHOWS_RESET':
            return initialState
        default:
            return state
    }
}

export async function fetchShows(){
    try{
        const res = await fetch('http://api.tvmaze.com/search/shows?q=batman');
        return res.json();
    }catch(e){
        if(e) throw e
    }
}

export function* handleShows() {
    try{
        yield put({type: "GET_SHOWS_START"});
        yield delay(1000);
        const result = yield call(fetchShows);
        yield put({type: "GET_SHOWS_SUCCESS", payload: result});
        yield delay(5000);
    }catch(e){
        yield put({type: 'GET_SHOWS_ERROR', payload: e})
    }finally {
        if (yield cancelled()){
            yield put({type: 'GET_SHOWS_CANCEL'});
        }
    }
};

export function* watchShows(){

    yield takeEvery('GET_SHOWS_RESET_TRIGGER', function* (props){
        yield put({type: 'GET_SHOWS_RESET'});
    })

    while( yield take('GET_SHOWS_TRIGGER') ){
        const fetchShowsTask = yield fork(handleShows);
        yield take('GET_SHOWS_CANCEL_TRIGGER')
        yield cancel(fetchShowsTask)
    }
}