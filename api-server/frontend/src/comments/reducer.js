
const INITIAL_STATE = {value: [], comment: {}}

export default function (state = INITIAL_STATE, action) {
    switch(action.type){
    case 'COMMENTS_EDIT':
        return {...state, value: action.payload.allComments, comment:action.payload.comment }
    case 'COMMENTS_REMOVE':
        const commentIndex = state.value.findIndex(comment => comment.id === action.payload.id)
        state.value.splice(commentIndex, 1, action.payload)
        return {...state}
    case 'COMMENTS_SAVE':
        return {...state, value: state.value.concat(action.payload)}
    case 'COMMENTS_VOTE':
        const { payload } = action
        return {...state, value: payload }
    case 'COMMENTS_GET_ALL':
        return {...state, value: action.payload, comment:{}}
    case 'COMMENTS_GET_BY_ID':
        return {...state, comment: action.payload}
    default:
        return state
    }
}
