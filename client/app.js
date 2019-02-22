import React from 'react';
import Home from './pages/home.jsx';
import Layout from './components/layout.js';
class App extends React.Component{
    render(){
        return (
            <Layout>
                <Home />
            </Layout>
        )
    }
}

export default App