import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { List } from 'antd';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-contend: center;
    align-items: center;
`

const route = [
    {id: 'index', path: '/'},
    {id: 'todo', path: '/todo'},
    {id: 'code-spliting', path: '/code-spliting'},
    {id: 'saga', path: '/saga'}
];

export default class Index extends React.Component{
    render(){
        return (
            <Container>
                <List 
                    dataSource={route}
                    renderItem={v=><List.Item><Link to={v.path}>{v.id}</Link></List.Item>}
                />
            </Container>
        )
    }
}