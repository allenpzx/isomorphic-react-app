import React from 'react';
import Layout from '../components/layout.js';
import { Link } from 'react-router-dom';
import { List } from 'antd';
import routes from '../routes';

export default class CateLog extends React.Component{
    render(){
        return (
            <Layout justifyContent={"center"}>
                <List 
                    bordered
                    style={{width: '50vw'}}
                    dataSource={routes}
                    renderItem={v=>{
                        if(v.path){
                            return <List.Item><Link to={v.path}>{v.id}</Link></List.Item>
                        }
                        return <React.Fragment />
                    }}
                />
            </Layout>
        )
    }
}