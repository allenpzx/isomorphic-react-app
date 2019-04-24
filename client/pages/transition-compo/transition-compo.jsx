import React from "react";
import { Typography, List, Button } from "antd";
import {
  Transition,
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
import "./index.css";

export default class extends React.Component {
  state = {
    list: [1, 2],
    inProp: true
  };

  handleAdd = () =>
    this.setState({
      list: this.state.list.concat(
        this.state.list[this.state.list.length - 1] + 1
      )
    });

  handleSubtract = () =>
    this.state.list.length > 1 &&
    this.setState({ list: this.state.list.slice(0, -1) });

  render() {
    return (
      <div>
        <Typography.Title>component mount and unmount animation</Typography.Title>
        <div className="button-group">
          <Button onClick={this.handleAdd}>+1</Button>
          <Button onClick={this.handleSubtract}>-1</Button>
          <Button
            onClick={() => this.setState({ inProp: !this.state.inProp })}
          >
            show
          </Button>
        </div>
        {/* <Transition in={this.state.inProp} timeout={500}>
          {state => (
            <ul className={`fade fade-${state}`}>
              <TransitionGroup className="todo-list">
                {this.state.list.map(v => (
                  <CSSTransition key={v} timeout={500} classNames="item">
                    <li>{v}</li>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </ul>
          )}
        </Transition> */}

        <Transition in={this.state.inProp} timeout={500}>
          {state => (
            <List className={`fade fade-${state}`}>
              <TransitionGroup className="todo-list">
                {this.state.list.map(v => (
                  <CSSTransition key={v} timeout={500} classNames="item">
                    <List.Item>
                      <div>{v}</div>
                    </List.Item>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </List>
          )}
        </Transition>
      </div>
    );
  }
}
