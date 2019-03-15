import React from 'react';
import { List, Button } from 'antd';

export default function TodoList({todos, toggleTodo}){
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
            <List
                header={<div style={{color: '#1890ff'}}>Todo list</div>}
                bordered
                dataSource={next}
                renderItem={item => (<List.Item actions={[<span onClick={()=>toggleTodo(item.id)}>toggle</span>]} style={{flexDirection: 'row', justifyContent: 'space-around', textDecoration: item.completed?'line-through':'none'}}>- {item.text}</List.Item>)}
            />
        </div>
    )
}