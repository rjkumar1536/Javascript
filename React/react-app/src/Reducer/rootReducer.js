const initState = {
    posts : [
        { id : 1, title : "hello", body : "good job"},
        { id : 2, title : "Always Happy to work", body : "Achievement tasks completed"}
    ]
}
const rootReducer = (state = initState , action)=>{
    console.log(state);
    if(action.type == 'DELETE_POST'){
        return {
            ...state,
            posts : state.posts.filter((post)=>{
                return post.id != action.id
            })
        }
    }
    return state;
}
export default rootReducer;