import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import { initializeStore } from './redux/index.js';
import { Provider } from 'react-redux';
const preloadedState = window.__PRELOADED_STATE__;
console.log('preloadedState: ', preloadedState);
const store = initializeStore(preloadedState);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));