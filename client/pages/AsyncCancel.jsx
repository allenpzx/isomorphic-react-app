import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

@connect(
    state=>({
        counter: state.counter,
        show: state.show
    }),
    dispatch=>({
        handleCount: type=>dispatch({type}),
        getShows: ()=>{
            dispatch({type: 'GET_SHOWS_START'})
        },
        cancelRequest: ()=>{
            dispatch({type: 'GET_SHOWS_CANCEL'})
        }
    })
)
class Saga extends React.Component {
    render(){
        console.log(this.props);
        return (
            <div>
                <h1>delay event</h1>
                {this.props.counter}
                <br />
                <Button onClick={()=>this.props.handleCount('ADD')}>add</Button>
                <Button onClick={()=>this.props.handleCount('SUBTRACT')}>minus</Button>
                <Button onClick={()=>this.props.handleCount('DELAY_ADD')}>delay add</Button>

                <br />
                <br />
                <h1>cancelable request</h1>
                {this.props.show.type}
                <br />
                <Button onClick={()=>this.props.getShows()}>request start</Button>
                <Button onClick={()=>this.props.cancelRequest()}>request cancel</Button>
            </div>
        )
    }
}

export default Saga