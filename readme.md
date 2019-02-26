## Isomorphic React App

server: `express`
client: `react` + `redux` + `react-router` + `react-loadable` + `styled-components` + `redux-saga`
test: `jest`
bundle: `webpack` + `babel`

Isomorphic React App, including SSR/code splitting/preload/dynamic import/side effect enhancer/CSS in JS/testing...

`yarn` install dependencies required

`yarn dev` Server side rendering development mode

`yarn build` Server side rendering production mode

`yarn start` Before this script you should `yarn` and `yarn build`, this script should on the server.

`yarn client:dev` SPA development mode

`yarn client:prod` SPA production mode

`yarn server:dev` Server development mode

`yarn server:prod` Server production mode

`yarn test` test mode

`yarn test:client` before script you should run `yarn client:prod` to bundle client production code, this script will test it

`yarn test:server` before script you should run `yarn server:prod` to bundle server production code, this script will test it