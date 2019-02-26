import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TodoList from '../components/todo-list.js';
import { Button, Input } from 'antd';
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

const getVisibleTodos = (todos, filter) => {
    switch(filter){
        case 'SHOW_ALL':
            return todos
        case 'SHOW_COMPLETED':
            return todos.filter(v=>v.completed)
        case 'SHOW_ACTIVE':
            return todos.filter(v=>!v.completed)
        default:
            return todos
    }
}

@connect(
    state=>({
        todo: getVisibleTodos(state.todo, state.todoFilter)
    }),
    dispatch=>({
        addTodo: v=>dispatch({type: 'ADD_TODO', payload: {text: v}}),
        toggleTodo: id=>dispatch({type: 'TOGGLE_TODO', payload: {id}}),
        filtTodos: filter=>dispatch({type: 'SET_VISIBILITY_FILTER', payload: filter})
    })
)
class Todo extends React.Component {

    render(){
        console.log('Test page props-', this.props);
        return (
            <Page>
                <h1>This is todo list Page!</h1>
                <p>use redux with react-redux in server side</p>
                <img style={{width: '200px'}} src={require('../assets/images/test.jpg')} alt="test"/>
                <Container>
                    <TodoList todos={this.props.todo} toggleTodo={this.props.toggleTodo}/>
                    <br />
                    <Button onClick={()=>this.props.filtTodos('SHOW_ALL')}>show all</Button>
                    <Button onClick={()=>this.props.filtTodos('SHOW_COMPLETED')}>show completed</Button>
                    <Button onClick={()=>this.props.filtTodos('SHOW_ACTIVE')}>show active</Button>
                    <br />
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