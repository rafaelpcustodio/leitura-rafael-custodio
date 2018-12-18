const INITIAL_STATE = {value: [], post: {}}

export default function (state = INITIAL_STATE, action) {
    switch(action.type){
    case 'POSTS_VOTE':
        const { payload } = action
        return {...state, value: payload }
    case 'POSTS_GET_BY_ID':
        return {...state, post: action.payload }
    case 'POSTS_GET_ALL':
        return {...state, value: action.payload}
    case 'POSTS_GET_ALL_BY_CATEGORY':
        return {...state, value: action.payload}
    case 'POSTS_SAVE':
        return {...state, value: state.value.concat(action.payload)}
    case 'POSTS_REMOVE':
        const postIndex = state.value.findIndex(post => post.id === action.payload.id)
        const passedValue = [...state.value]
        passedValue.splice(postIndex, 1, action.payload)
        return {...state, value: passedValue }
    case 'POSTS_EDIT':
        return {...state, value: action.payload.allPosts, post:action.payload.post }
    default:
        return state
    }
}
