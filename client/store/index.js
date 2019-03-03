import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {show} from './show.js';
import {counter} from './counter.js';
import {todo} from './todo.js';
import todoFilter from './todo.filter.js';
import rootSaga from './sagas.js';
import createSagaMiddleware from 'redux-saga';
const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({
    show,
    counter,
    todo,
    todoFilter
})
const enhancer = applyMiddleware(thunk, sagaMiddleware);
const initializeStore = preloadedState => {
    let store = createStore(reducer, preloadedState?preloadedState:undefined, enhancer)
    sagaMiddleware.run(rootSaga);
    return store
};
export {initializeStore}