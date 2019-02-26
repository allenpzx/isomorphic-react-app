import React from 'react';
import { List, Button } from 'antd';

export default function TodoList({todos, completedTodo}){
    let arr1 = [];
    let arr2 = [];
    todos.map(v=>{
        if(v.completed === true){
            return arr1.push(v)
        }
        arr2.push(v)
    })
    const next = arr2.concat(arr1);
    return (
        <div>
            <h1>Todo list</h1>
            <List
                bordered
                dataSource={next}
                renderItem={item => (<List.Item style={{flexDirection: 'row', justifyContent: 'space-around', textDecoration: item.completed?'line-through':'none'}}>-{item.text}<Button onClick={()=>completedTodo(item.id)}>完成</Button></List.Item>)}
            />
        </div>
    )
}