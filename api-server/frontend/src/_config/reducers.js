import categoryReducer from 'categories/reducer'
import postReducer from 'posts/reducer'
import commentReducer from 'comments/reducer'
import { combineReducers } from 'redux'


const reducers = combineReducers({
    categories: categoryReducer,
    posts: postReducer,
    comments: commentReducer
})

export default reducers;
