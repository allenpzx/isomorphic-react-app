import React from "react";
import styled from "styled-components";

const ContainerDiv = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.justifyContent || "flex-start"};
  align-items: center;
  box-sizing: border-box;
`;

export default class Container extends React.Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
        <ContainerDiv {...this.props}>{this.props.children}</ContainerDiv>
    );
  }
}