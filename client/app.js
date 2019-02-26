import React from "react";
import Index from './pages/index.jsx';
import CodeSpliting from "./pages/CodeSpliting.jsx";
import Layout from "./components/layout.js";
import Todo from "./pages/todo.jsx";
import Saga from './pages/saga.jsx';
import { Switch, Route } from "react-router-dom";
import 'antd/dist/antd.css';
class App extends React.Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/code-spliting" component={CodeSpliting} />
          <Route path="/todo" component={Todo} />
          <Route path="/saga" component={Saga} />
          <Route component={Index} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
