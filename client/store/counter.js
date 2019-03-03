const initialState = 0;
const counter = (state = initialState, action) => {
    switch(action.type){
        case 'ADD':
            return state+1
        case 'SUBTRACT':
            return state-1
        default:
            return state
    }
}
const setCounter = dispatch => operation => {
    dispatch({type: operation});
};
export {counter, setCounter}