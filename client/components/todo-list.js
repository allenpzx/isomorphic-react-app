import React from 'react';
import { List, Button } from 'antd';

export default function TodoList({todos, completedTodo}){
    return (
        <div>
            <h1>Todo list</h1>
            <List
                bordered
                dataSource={todos}
                renderItem={item => (<List.Item extra={<Button onClick={()=>completedTodo(item.id)} style={{position: 'absolute', right: '0.5rem', top: '0.4rem'}}>完成</Button>}>-{item.text}</List.Item>)}
            />
        </div>
    )
}