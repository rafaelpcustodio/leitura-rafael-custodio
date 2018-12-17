import thunk from 'redux-thunk'
import { applyMiddleware, compose, createStore } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from './reducers'


const middleware = [
    thunk
]

const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(
            ...middleware
        ),
    ),
)

export default store;
