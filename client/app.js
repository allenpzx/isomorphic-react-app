import React from "react";
import Home from "./pages/home.jsx";
import Layout from "./components/layout.js";
import Todo from "./pages/todo.jsx";
import { Switch, Route } from "react-router-dom";
import 'antd/dist/antd.css';
class App extends React.Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/todo" component={Todo} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
