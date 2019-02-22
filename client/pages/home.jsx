import React from 'react';
import { Route, Link} from 'react-router-dom';
import A from '../components/a.js';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setShow } from '../redux/show.js';
import { withRouter, Switch, Redirect } from 'react-router-dom';
import { setCounter } from '../redux/counter.js';
import Loadable from 'react-loadable';

const B = Loadable({
    loader: () => import('../components/b.js'),
    loading() {
      return <div>Loading...</div>
    }
  });
  

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
    border: 1px solid red;
`;

const Item = styled.div`
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
`;

const Button = styled.div`
    border: none;
    padding: 1rem 2rem;
    background-color: yellow;
`

const Empty = () => <div>Empty component...</div>;

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state={
            counter: 0,
            shows: []
        }
    }

    componentDidMount(){
        // console.log('did mount')
        this.props.setShow();
    }

    componentWillMount(){
        // console.log('will mount')
    }

    componentDidUpdate(){
        // console.log('did update')
    }

    onMouseOver = () => {
        B.preload();
    }

    render(){
        const show = this.props.show;
        const counter = this.props.counter;
        return (
            <div>
                <h1>Home page</h1>
                <button onClick={()=>printMe()}></button>
                <div>
                    <h2>state.counter</h2>
                    {this.state.counter}
                </div>
                <button onClick={()=>this.setState({counter: this.state.counter+1})}>+</button>
                <button onClick={()=>this.setState({counter: this.state.counter-1})}>-</button>
                <br />
                <br />
                <div>
                    <h2>redux.counter</h2>
                    {counter}
                </div>
                <button onClick={()=>this.props.setCounter('ADD')}>+</button>
                <button onClick={()=>this.props.setCounter('SUBTRACT')}>-</button>
                <br />
                <br />
                <div>
                    <h2>react-router</h2>
                    <Link to='/a' >to A</Link>
                    <Link to='/b' onMouseOver={()=>this.onMouseOver()}>to B</Link>
                </div>
                <br />
                <br />
                <Switch>
                    <Route path='/a' component={A} />
                    <Route path='/b' component={B} />
                    <Route component={Empty} />
                    <Redirect from='/ceshi' to='/b' />
                </Switch>
                <Container>
                    {show && show.payload instanceof Array && show.payload.map(v=><Item key={v.show.url}><h2>{v.show.name}</h2><img src={v.show.image ? v.show.image.medium : null}/></Item>)}
                </Container>
                <Button onClick={()=>this.props.setShow('red')}>load more</Button>
            </div>
        )
    }
}
export default withRouter(connect(
    state=>({
        show: state.show,
        counter: state.counter
    }),
    dispatch=>({
        setShow: name=>setShow(dispatch)(name?name:null),
        setCounter: operation=>setCounter(dispatch)(operation)
    })
)(Home))