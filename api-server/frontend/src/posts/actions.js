import * as BackAPI from 'resources/backPostAPI'

function votePost(id, option){
    return (dispatch, getState) => {
        BackAPI.votePost(id, option).then(resp => {
            const { posts } = getState()
            const allPosts = [].concat(posts.value)
            const postIndex = allPosts.findIndex(post => post.id === resp.id)
            if (postIndex >= 0) {
                allPosts.splice(postIndex, 1, resp)
                dispatch({
                    type: 'POSTS_VOTE',
                    payload: allPosts
                })
            }
        })
    }
}

function removePost(id) {
    return (dispatch) => {
        BackAPI.removePost(id).then(resp => {
            dispatch({
                type: 'POSTS_REMOVE',
                payload: resp
            })
        })
    }
}

function getAllPosts() {
    return dispatch => {
        BackAPI.getAllPosts().then( resp => {
            dispatch({
                type: 'POSTS_GET_ALL',
                payload: resp
            })
        })
    }
}

function getAllSortedPosts() {
    return dispatch => {
        BackAPI.getAllPosts().then( resp => {
            const respSorted = resp.sort((a,b) =>  b.voteScore - a.voteScore)
            dispatch({
                type: 'POSTS_GET_ALL',
                payload: respSorted
            })
        })
    }
}

function getPostById(id){
    return (dispatch) => {
        BackAPI.getPostById(id).then( resp => {
            dispatch({
                type: 'POSTS_GET_BY_ID',
                payload: resp
            })
        })
    }
}

function getPostsByCategory(category) {
    return dispatch => {
        BackAPI.getPostsByCategory(category).then( resp => {
            dispatch({
                type: 'POSTS_GET_ALL_BY_CATEGORY',
                payload: resp
            })
        })
    }
}

function savePost(post) {
    return (dispatch) => {
        BackAPI.savePost(post).then( resp => {
            dispatch({
                type: 'POSTS_SAVE',
                payload: resp
            })
        })
    }
}

function editPost(id, post) {
    return (dispatch, getState) => {
        BackAPI.editPost(id, post).then( resp => {
            const { posts } = getState()
            const allPosts = [].concat(posts.value)
            const postIndex = allPosts.findIndex(post => post.id === resp.id)
            if (postIndex >= 0) {
                allPosts.splice(postIndex, 1, resp)
                dispatch({
                    type: 'POSTS_EDIT',
                    payload: { allPosts, post: resp }
                })
            }
        })
    }
}

function editPostIncrementalCommentCount(id, post) {
    return (dispatch, getState) => {
        const { posts } = getState()
        const allPosts = [].concat(posts.value)
        let newCommentCount = post.commentCount
        newCommentCount = newCommentCount + 1
        post.commentCount = newCommentCount
        const postIndex = allPosts.findIndex(p => p.id === post.id)
        if (postIndex >= 0) {
            allPosts.splice(postIndex, 1, post)
            BackAPI.editPost(id, post).then( resp => {
                dispatch({
                    type: 'POSTS_EDIT',
                    payload: { allPosts, post: resp }
                })
            })
        }
    }
}

function editPostDecrementCommentCount(id, post) {
    return (dispatch, getState) => {
        const { posts } = getState()
        const allPosts = [].concat(posts.value)
        let newCommentCount = post.commentCount
        newCommentCount = newCommentCount - 1
        post.commentCount = newCommentCount
        const postIndex = allPosts.findIndex(p => p.id === post.id)
        if (postIndex >= 0) {
            allPosts.splice(postIndex, 1, post)
            BackAPI.editPost(id, post).then( resp => {
                dispatch({
                    type: 'POSTS_EDIT',
                    payload: { allPosts, post: resp }
                })
            })
        }
    }
}

export { getAllPosts , editPostIncrementalCommentCount, editPostDecrementCommentCount  ,getPostsByCategory, savePost, removePost, editPost, getPostById, votePost, getAllSortedPosts }




