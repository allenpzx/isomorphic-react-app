const initialState = [{id: 0, text: 'text', completed: false}];
const completedTodo = (state, id) => {
    let next = state.slice();
    next.find((v, i, arr)=>{
        if(v.id===id){
            v.completed = true
        }
    });
    console.log(next);
    return next;
}
let todoId = 1;
const todo = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_TODO':
            return [...state, {id: todoId++, text: action.payload.text, completed: false}]
        case 'COMPLETED_TODO':
            return completedTodo(state, action.payload.id);
        case 'FILTER_TODO':
            return 
        default:
            return state
    }
}

export {todo}