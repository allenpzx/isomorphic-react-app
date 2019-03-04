## Isomorphic React App

server: `express 4`
client: `react 16` + `redux 4` + `react-router 4` + `react-loadable 5` + `styled-components 4` + `redux-saga 1`
test: `jest 24`
bundle: `webpack 4` + `babel 7`

Isomorphic React App, including SSR/code splitting/preload/dynamic import/side effect enhancer/CSS in JS/testing...

`yarn` install dependencies required

`yarn dev` Server side rendering development mode

`yarn build` Server side rendering production mode

`yarn start` Before this script you should `yarn` and `yarn build`, this script should on the server.

`yarn client:dev` SPA development mode

`yarn client:prod` SPA production mode

`yarn client:start` SPA production static server mode

`yarn server:dev` Server development mode

`yarn server:prod` Server production mode

`yarn test` test mode

`yarn test:client` before script you should run `yarn client:prod` to bundle client production code, this script will test it

`yarn test:server` before script you should run `yarn server:prod` to bundle server production code, this script will test it