const ReactDOMServer = require('react-dom/server');
const fs = require('fs');
const path = require('path');
import React from 'react';
import App from '../client/app.js';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import {StaticRouter} from 'react-router-dom';
import { initializeStore } from '../client/store/index.js';
import { Provider } from 'react-redux';

const renderFullPage = (rootElement, preloadedState, main) => `
<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="theme-color" content="#000000" />
      <title>React App</title>
    </head>
    <style>
      body{
        margin: 0;
        padding: 0;
      }
    </style>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">${rootElement}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState?preloadedState:null).replace(
          /</g,
          '\\u003c'
        )}
      </script>
      // <script src='/client.bundle.js'></script>
      <script src=${main}></script>
    </body>
  </html>
  
`;

export default function (req, res, next){
    const sheet = new ServerStyleSheet();
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
        store.dispatch({type: 'ADD'});
        store.dispatch({type: 'ADD'});
        store.dispatch({type: 'ADD'});
        store.dispatch({type: 'ADD'});
        store.dispatch({type: 'ADD'});
        const preloadedState = store.getState();

        async function main(){
          try{
            const res = await fs.readFileSync(path.resolve(__dirname, '../dist/client.manifest.json'), 'utf8');
            const client_manifest = JSON.parse(res)['client.js'];
            return client_manifest;
          }catch(e){
            if (e) throw e
          }
        }
        main().then(res=>{
          const fullPage = renderFullPage(markup, preloadedState, res);
          res.send(fullPage);
        })
    }
}