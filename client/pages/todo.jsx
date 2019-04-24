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

    button{
        margin: 0 10px 0 0;
    }
`;

const Layout = styled.div`
    width: 80vw;
    padding: 1rem 2rem;
`;

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

    state = {
        todo: ''
    }

    handleChange = e => this.setState({todo: e.target.value});

    handleAddTodo = v => {
        this.props.addTodo(v);
        this.setState({todo: ''});
    }

    render(){
        const { todo, toggleTodo, filtTodos } = this.props;
        return (
            <Page>
                <Layout>
                    <TodoList todos={todo} toggleTodo={toggleTodo}/>
                    <br />
                    <Button onClick={()=>filtTodos('SHOW_ALL')}>show all</Button>
                    <Button onClick={()=>filtTodos('SHOW_COMPLETED')}>show completed</Button>
                    <Button onClick={()=>filtTodos('SHOW_ACTIVE')}>show active</Button>
                    <br />
                    <br />
                    <Search
                        placeholder="input todo text"
                        enterButton="todo"
                        onSearch={this.handleAddTodo}
                        value={this.state.todo}
                        onChange={this.handleChange}
                    />
                </Layout>
            </Page>
        )
    }
}

export default Todo