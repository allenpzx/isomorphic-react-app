import React from 'react';

const testD3 = async () => {
    try{
        const d3 = await import('d3');
        d3.select('h1').style('color', 'red');
    }catch(e){
        throw e
    }
}

export default class A extends React.Component{
    render(){
        return (
            <div>
                <h1 onClick={()=>testD3()}>A</h1>
            </div>
        )
    }
}