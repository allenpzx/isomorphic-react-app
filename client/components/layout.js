import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100vw;
    min-height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
`
class Layout extends React.Component{
    render(){
        return (
            <Container>{this.props.children}</Container>
        )
    }
}
export default Layout