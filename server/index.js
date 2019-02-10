const express = require('express');
const app = express();
const PORT = process.env.PORT || 9090;
const ReactDOMServer = require('react-dom/server');
import React from 'react';
import App from '../client/app.js';
import renderFullPage from './render-fullpage.js';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import {StaticRouter} from 'react-router-dom';
import { initializeStore } from '../client/redux/index.js';
import { Provider } from 'react-redux';

app
.use(express.static('dist'))
.use('*', (req, res, next)=>{
    const sheet = new ServerStyleSheet(); // for styled-components
    const store = initializeStore();
    const context = {};
    const markup = ReactDOMServer.renderToString(
        <StyleSheetManager sheet={sheet.instance}>
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <App />
                </StaticRouter>
            </Provider>
        </StyleSheetManager>
    );

    if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        redirect(301, context.url);
    } else {
        // we're good, send the response

        store.dispatch({type: 'ADD'})
        store.dispatch({type: 'ADD'})
        store.dispatch({type: 'ADD'})
        store.dispatch({type: 'ADD'})
        store.dispatch({type: 'ADD'})

        const preloadedState = store.getState();
        console.log('server', preloadedState);
        const fullPage = renderFullPage(markup, preloadedState);
        res.send(fullPage);
    }
})
.listen(PORT, (error)=>{
    if(error){
        console.log('[error]-', error);
    }
    console.log(`App is listent on PORT ${PORT}`);
})