// const setShow = dispatch => name => {
//     dispatch({type: 'GET_START'})
//     fetch(`http://api.tvmaze.com/search/shows?q=${name?name:'batman'}`)
//     .then(res=>res.json())
//     .then(re=>{
//         console.log(re)
//         dispatch({type: 'GET_SUCCESS', payload: re});
//     })
//     .catch(error=>{
//         dispatch({type: 'GET_ERROR'})
//         throw error
//     });
// };
const initialState = {type: 'initial', payload: []};
const show = (state = initialState, action) => {
    switch(action.type){
        case 'GET_SHOWS_START':
            return {...state, type: 'loading'}
        case 'GET_SHOWS_SUCCESS':
            return {type: 'success', payload: state.payload.concat(action.payload)}
        case 'GET_SHOWS_ERROR':
            return {...state, type: 'error'}
        default:
            return state
    }
}
export { show }