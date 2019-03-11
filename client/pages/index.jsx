import React from 'react';
import Layout from '../components/layout.js';
import { Link } from 'react-router-dom';
import { List } from 'antd';

const route = [
    {id: 'index', path: '/'},
    {id: 'todo', path: '/todo'},
    {id: 'code-spliting', path: '/code-spliting'},
    {id: 'async-cancel', path: '/async-cancel'},
    {id: 'water-fall', path: '/water-fall'},
    {id: 'water-mark', path: '/water-mark'}
];

export default class Index extends React.Component{
    render(){
        return (
            <Layout justifyContent={"center"}>
                <List 
                    bordered
                    style={{width: '50vw'}}
                    dataSource={route}
                    renderItem={v=><List.Item><Link to={v.path}>{v.id}</Link></List.Item>}
                />
            </Layout>
        )
    }
}