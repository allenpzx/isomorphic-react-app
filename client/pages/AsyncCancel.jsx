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
            console.log('excute')
            dispatch({type: 'GET_SHOWS_TRIGGER'});
        },
        cancelRequest: ()=>{
            dispatch({type: 'GET_SHOWS_CANCEL'});
        },
        resetShows: ()=>{
            dispatch({type: 'GET_SHOWS_RESET'});
        }
    })
)
class Saga extends React.Component {
    render(){
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
                <Button onClick={()=>this.props.resetShows()}>reset shows</Button>
            </div>
        )
    }
}

export default Saga