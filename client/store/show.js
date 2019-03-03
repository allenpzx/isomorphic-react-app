import { call, take, fork, put } from 'redux-saga/effects';

const initialState = {type: 'initial', payload: []};
export const show = (state = initialState, action) => {
    switch(action.type){
        case 'GET_SHOWS_START':
            return {...state, type: 'loading'}
        case 'GET_SHOWS_SUCCESS':
            return {type: 'success', payload: state.payload.concat(action.payload)}
        case 'GET_SHOWS_ERROR':
            return {...state, type: 'error'}
        default:
            return state
    }
}

const delay = time => new Promise((resolve)=>setTimeout(()=>resolve, time));

export async function fetchShows(){
    try{
        const res = await fetch('http://api.tvmaze.com/search/shows?q=batman');
        const result = res.json();
        return result
    }catch(e){
        if(e) throw e
    }
}

export function* handleShows() {
    try{
        while (true) {
            yield put({type: "GET_SHOWS_START"});
            const result = yield call(fetchShows);
            yield put({type: "GET_SHOWS_SUCCESS", payload: result});
            yield delay(5000);
        }
    }catch(e){
        yield put({type: 'GET_SHOWS_ERROR'})
    }
};

export function* watchShows(){
    while(take('GET_SHOWS_TRIGGER')){
        const fetchShowsTask = yield fork(handleShows);
        yield take('GET_SHOWS_CANCEL')
        yield cancel(fetchShowsTask)
    }
}