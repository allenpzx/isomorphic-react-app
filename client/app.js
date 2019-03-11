import React from "react";
import Index from './pages/index.jsx';
import CodeSpliting from "./pages/CodeSpliting.jsx";
import Layout from "./components/layout.js";
import Todo from "./pages/todo.jsx";
import AsyncCancel from './pages/AsyncCancel.jsx';
import { Switch, Route } from "react-router-dom";
import WaterFall from './pages/water-fall.jsx';
import WaterMark from './pages/water-mark.jsx';
import 'antd/dist/antd.css';
import './assets/styles/index.css';

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/code-spliting" component={CodeSpliting} />
          <Route path="/todo" component={Todo} />
          <Route path="/async-cancel" component={AsyncCancel} />
          <Route path="/water-fall" component={WaterFall} />
          <Route path="/water-mark" component={WaterMark} />
          <Route component={Index} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
