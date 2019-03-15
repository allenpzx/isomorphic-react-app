import React from 'react';
import { connect } from 'react-redux';
import { List, Button } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
    button{
        margin: 10px 10px 0 0;
    }
`

@connect(
    state=>({
        counter: state.counter,
        show: state.show
    }),
    dispatch=>({
        handleCount: type=>dispatch({type, payload: 'delay add payload!'}),
        handleDispatch: type=>dispatch({type: type})
    })
)
class Saga extends React.Component {
    render(){
        return (
            <Container>
                <h1>delay event</h1>
                {this.props.counter}
                <br />
                <Button onClick={()=>this.props.handleCount('ADD')}>add</Button>
                <Button onClick={()=>this.props.handleCount('SUBTRACT')}>minus</Button>
                <Button onClick={()=>this.props.handleCount('DELAY_ADD')}>delay add</Button>
                <br />
                <br />
                <h1>cancelable request</h1>
                {this.props.show.payload && <List header={<div>{this.props.show.type}</div>} bordered dataSource={this.props.show.payload} renderItem={item => (<List.Item>{item.score}分 名称:{item.show.name}</List.Item>)} />
                }
                <br />
                <Button onClick={()=>this.props.handleDispatch('GET_SHOWS_TRIGGER')}>request start</Button>
                <Button onClick={()=>this.props.handleDispatch('GET_SHOWS_CANCEL_TRIGGER')}>request cancel</Button>
                <Button onClick={()=>this.props.handleDispatch('GET_SHOWS_RESET_TRIGGER')}>reset shows</Button>
            </Container>
        )
    }
}

export default Saga