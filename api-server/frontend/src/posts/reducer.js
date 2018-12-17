const INITIAL_STATE = {value: [], post: {}}

export default function (state = INITIAL_STATE, action) {
    switch(action.type){
    case 'POSTS_VOTE':///ok??
        const { payload } = action
        return {...state, value: payload }
    case 'POSTS_GET_BY_ID'://ok
        return {...state, post: action.payload }
    case 'POSTS_GET_ALL'://ok
        return {...state, value: action.payload}
    case 'POSTS_GET_ALL_BY_CATEGORY'://ok
        return {...state, value: action.payload}
    case 'POSTS_SAVE'://ok
        return {...state, value: state.value.concat(action.payload)}
    case 'POSTS_REMOVE'://ok
        const postIndex = state.value.findIndex(post => post.id === action.payload.id)
        state.value.splice(postIndex, 1, action.payload)
        return {...state }
    case 'POSTS_EDIT':
        return {...state, value: action.payload.allPosts, post:action.payload.post }
    default:
        return state
    }
}
