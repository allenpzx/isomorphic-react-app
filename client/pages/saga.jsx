import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

@connect(
    state=>({
        counter: state.counter
    }),
    dispatch=>({
        handleCount: type=>dispatch({type})
    })
)
class Saga extends React.Component {
    render(){
        console.log(this.props);
        return (
            <div>
                <h1>This is Test Saga Page!</h1>
                {this.props.counter}
                <br />
                <Button onClick={()=>this.props.handleCount('ADD')}>add</Button>
                <Button onClick={()=>this.props.handleCount('SUBTRACT')}>minus</Button>
                <Button onClick={()=>this.props.handleCount('DELAY_ADD')}>delay add</Button>
            </div>
        )
    }
}

export default Saga