const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const app = express();
const config = require('./dev.config.js');
const compiler = webpack(config);
const PORT = 9090;
const path = require('path');

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  stats: {
      colors: true
  },
  noInfo: true
}));

app.use(webpackHotMiddleware(compiler));
app.get('/favicon:ext', (req, res)=>{
    res.sendFile(path.resolve(__dirname, `../public/favicon.${req.params.ext}`));
})
app.use('*', (req, res, next)=>{
    console.log('req.url: ', req.url);
})

app.listen(PORT, function () {
  console.log(`Example app listening on port http://localhost:${PORT}!\n`);
});