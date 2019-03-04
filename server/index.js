const express = require('express');
const app = express();
const PORT = process.env.PORT || 9090;
const ReactDOMServer = require('react-dom/server');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
import React from 'react';
import App from '../client/app.js';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import {StaticRouter} from 'react-router-dom';
import { initializeStore } from '../client/store/index.js';
import { Provider } from 'react-redux';

const renderFullPage = (rootElement, preloadedState, manifest) => `
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
      <script src='/client.bundle.js'></script>
    </body>
  </html>
  
`;

const withPromiseFile = (route) => {
  return Promise((resolve, reject)=>{
    fs.readFileSync(route, 'utf8', (err, data)=>{
      if(err) return reject(err)
      resolve(data);
    })
  })
};

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
        store.dispatch({type: 'ADD'});
        store.dispatch({type: 'ADD'});
        store.dispatch({type: 'ADD'});
        store.dispatch({type: 'ADD'});
        store.dispatch({type: 'ADD'});
        const preloadedState = store.getState();

        Promise
        .all([
            withPromiseFile(path.resolve(__dirname, '../dist/client.manifest.json')), 
            withPromiseFile(path.resolve(__dirname, '../public/index.html'))
        ])
        .then(re=>{
          console.log('re: ', re);
        })
        .catch(e=>{
          console.log('e: ', e);
        })

        // new Promise((resolve, reject)=>{
        //   fs.readFileSync(path,resolve(__dirname, '../public/index.html'), 'utf8', (err, data)=>{
        //     if(err) reject(err);
        //     resolve(data);
        //   })
        //   fs.readFileSync(path.resolve(__dirname, '../dist/client.manifest.json'), 'utf8', (err, data)=>{
        //     if(err) reject(err);
        //     handler()
        //     resolve(JSON.parse(data)['client.js']);
        //   })
        // })
        // .then(html=>{
        //   console.log('res', html);
        //   const $ = cheerio.load(html);
        //   const root = $('#root');
        //   root.append(markup)
        //   root.after(`<script>
        //     window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState?preloadedState:null).replace(/</g,'\\u003c')}</script>`);
        //   root.after(`<script src='/client.bundle.js'></script>`);
        //   console.log($.html());
        //   const fullPage = $.html();
        //   res.send(fullPage);
        // })
        // .catch(err=>{
        //   console.log('server read html template error: ', err);
        //   throw err
        // })

        // const fullPage = renderFullPage(markup, preloadedState);
        // res.send(fullPage);
    }
})
.listen(PORT, (error)=>{
    if(error){
        console.log('[error]-', error);
    }
    console.log(`App is listent on PORT ${PORT}`);
})