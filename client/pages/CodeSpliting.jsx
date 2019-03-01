import React from 'react';
import { Route, Link} from 'react-router-dom';
import A from '../components/a.js';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter, Switch } from 'react-router-dom';
import { setCounter } from '../redux/counter.js';
import Loadable from 'react-loadable';
import { Button } from 'antd';

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
const Empty = () => <div>Empty component...</div>;

class CodeSpliting extends React.Component{

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
        const counter = this.props.counter;
        return (
            <div>
                <h1>Home page</h1>
                <p>show sync update data when concat data, multiple in split page</p>
                <p>show code spliting and preload bundle</p>
                <p>dynamic import</p>
                <div>
                    <h2>state.counter this test for after ssr binding event</h2>
                    {this.state.counter}
                </div>
                <Button onClick={()=>this.setState({counter: this.state.counter+1})}>+</Button>
                <Button onClick={()=>this.setState({counter: this.state.counter-1})}>-</Button>
                <br />
                <br />
                <div>
                    <h2>redux.counter this test for sync state from server(common state was used for server and client if 5 is ok)</h2>
                    {counter}
                </div>
                <Button onClick={()=>this.props.setCounter('ADD')}>+</Button>
                <Button onClick={()=>this.props.setCounter('SUBTRACT')}>-</Button>
                <br />
                <br />
                <div>
                    <h2>Splited bundle ⬇️ you can check network on chrome browser and hover mouse on Button B to check it</h2>
                    <Button><Link to='/code-spliting/a'>to A</Link></Button>
                    <Button><Link to='/code-spliting/b' onMouseOver={()=>this.onMouseOver()}>to B(mouse hover will preload bundle)</Link></Button>
                </div>
                <br />
                <br />
                <Switch>
                    <Route path='/code-spliting/a' component={A} />
                    <Route path='/code-spliting/b' component={B} />
                    <Route component={Empty} />
                </Switch>
                {/* <Container>
                    {show && show.payload instanceof Array && show.payload.map(v=><Item key={v.show.url}><h2>{v.show.name}</h2><img src={v.show.image ? v.show.image.medium : null}/></Item>)}
                </Container>
                <Button onClick={()=>this.props.setShow('red')}>load more</Button> */}
            </div>
        )
    }
}
export default withRouter(connect(
    state=>({
        // show: state.show,
        counter: state.counter
    }),
    dispatch=>({
        // setShow: name=>setShow(dispatch)(name?name:null),
        setCounter: operation=>setCounter(dispatch)(operation)
    })
)(CodeSpliting))