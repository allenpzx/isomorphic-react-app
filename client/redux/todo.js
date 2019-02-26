const initialState = [{id: 0, text: 'text', completed: false}];
const completedTodo = (state, id) => {
    const next = state.find((v, i, arr)=>{
        if(v.id===id){
            arr[i].completed = !arr[i].completed;
        }
    })
    console.log(next);
    return next;
}
let todoId = 1;
const todo = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_TODO':
            return [...state, {id: todoId++, text: action.payload.text, completed: false}]
        case 'COMPLETED_TOTO':
            return completedTodo(state, action.payload.id);
        default:
            return state
    }
}

export {todo}