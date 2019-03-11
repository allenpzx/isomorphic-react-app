## Isomorphic React App

server: `express`
client: `react` + `redux` + `react-router` + `react-loadable` + `styled-components` + `redux-saga`
test: `jest`
bundle: `webpack` + `babel`
daemon: `pm2`

Default Mode: `SPA`

`yarn` install required dependencies for all operations

`yarn dev` Server side rendering development mode

`yarn build` Server side rendering production mode

`yarn start` Before this script you should `yarn` and `yarn build`, this script should on the server.

`yarn client:dev` SPA development mode

`yarn client:prod` SPA production mode

`yarn client:start` SPA production static server mode