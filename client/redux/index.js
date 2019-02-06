import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {show} from './show.js';
import {counter} from './counter.js';
const reducer = combineReducers({
    show,
    counter
})
const isBrowser = ()=>{
    try {
        return this===window;
    }catch(e){
         return false;
    }
};
const enhancer = applyMiddleware(thunk);
const initializeStore = preloadedState => createStore(reducer, preloadedState?preloadedState:undefined, enhancer);
export {initializeStore}