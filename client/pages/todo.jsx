import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TodoList from '../components/todo-list.js';
import { Input } from 'antd';
const Search = Input.Search;

const Page = styled.div`
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
`

const BTN = styled.div`
    border: 1px solid yellow;
    padding: 1rem 2rem;
    background-color: orange;
`
const Container = styled.div`
    width: 50vw;
    border: 1px solid yellow;
    padding: 1rem 2rem;
`

@connect(
    state=>({
        todo: state.todo
    }),
    dispatch=>({
        addTodo: v=>dispatch({type: 'ADD_TODO', payload: {text: v}}),
        completedTodo: id=>console.log('completed todo', id)
    })
)
class Todo extends React.Component {

    render(){
        console.log('Test page props-', this.props);
        return (
            <Page>
                <h1>This is Test Page!</h1>
                <img style={{width: '200px'}} src={require('../assets/images/test.jpg')} alt="test"/>
                <Container>
                    <TodoList todos={this.props.todo} completedTodo={this.props.completedTodo}/>
                    <br />
                    <Search
                        placeholder="input todo text"
                        enterButton="todo"
                        onSearch={value => {
                            this.props.addTodo(value);
                        }}
                    />
                </Container>
                <BTN onClick={()=>this.props.testSage()}>get some tv detail</BTN>
            </Page>
        )
    }
}

export default Todo