const renderFullPage = (rootElement, preloadedState) => `
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
      <script src='/bundle.js'></script>
    </body>
  </html>
  
`;
export default renderFullPage