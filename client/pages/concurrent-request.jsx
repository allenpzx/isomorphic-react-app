import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100vw;
    min-height: 100vh;
    font-size: 1rem;
`

export default function ConcurrentRequest (){

    const [count, setCount] = useState(0);
    
    return (
        <Container>
            This is Concurent request page!
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </Container>
    )
}