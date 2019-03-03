const initialState = [{id: 0, text: 'text', completed: false}];
const toggleTodo = (state, id) => {
    let next = state.slice();
    next.find((v, i, arr)=>{
        if(v.id===id){
            v.completed = !v.completed
        }
    });
    return next;
}
let todoId = 1;
const todo = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_TODO':
            return [...state, {id: todoId++, text: action.payload.text, completed: false}]
        case 'TOGGLE_TODO':
            return toggleTodo(state, action.payload.id);
        default:
            return state
    }
}

export {todo}