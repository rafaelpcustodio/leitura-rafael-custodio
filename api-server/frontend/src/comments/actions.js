import * as BackAPI from 'resources/backCommentAPI'


function voteComment(id, option){
    return (dispatch, getState) => {
        BackAPI.voteComment(id, option).then(resp => {
            const { comments } = getState()
            const allComments = [].concat(comments.value)
            const commentIndex = allComments.findIndex(comment => comment.id === resp.id)
            if (commentIndex >= 0) {
                allComments.splice(commentIndex, 1, resp)
                dispatch({
                    type: 'COMMENTS_VOTE',
                    payload: allComments
                })
            }
        })
    }
}

function deleteComment(id) {
    return (dispatch) => {
        BackAPI.deleteComment(id).then(resp => {
            dispatch({
                type: 'COMMENTS_REMOVE',
                payload: resp
            })
        })
    }
}

function getAllComments(id) {
    return dispatch => {
        BackAPI.getAllComments(id).then( resp => {
            dispatch({
                type: 'COMMENTS_GET_ALL',
                payload: resp
            })
        })
    }
}

function getCommentById(id){
    return (dispatch) => {
        BackAPI.getComment(id).then( resp => {
            dispatch({
                type: 'COMMENTS_GET_BY_ID',
                payload: resp
            })
        })
    }
}


function addComment(comment, idPost) {
    return (dispatch) => {
        BackAPI.addComment(comment, idPost).then( resp => {
            dispatch({
                type: 'COMMENTS_SAVE',
                payload: resp
            })
        })
    }
}

function editComment(id, comment) {
    return (dispatch, getState) => {
        BackAPI.editComment(id, comment).then( resp => {
            const { comments } = getState()
            const allComments = [].concat(comments.value)
            const commentIndex = allComments.findIndex(comment => comment.id === resp.id)
            if (commentIndex >= 0) {
                allComments.splice(commentIndex, 1, resp)
                dispatch({
                    type: 'COMMENTS_EDIT',
                    payload: { allComments, comment: resp }
                })
            }
        })
    }
}

export { getAllComments, addComment, deleteComment, editComment, getCommentById, voteComment }

