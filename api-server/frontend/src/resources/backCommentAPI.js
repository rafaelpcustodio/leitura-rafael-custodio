const api = 'http://localhost:3001/'


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

const getAllComments = (id) => {
    return fetch(`${api}posts/${id}/comments`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(res => (
        res.json()
    ))
}

const addComment = (comment, idPost) => {
    return fetch(`${api}comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {...comment,
                 parentId: idPost,
                 parentDeleted: false,
                 timestamp:new Date().toLocaleString(),
                 id:Math.random().toString(36).substr(-8)
        } )
    }).then(res => (
        res.json()
    ))
}

const getComment = (id) => {
    return fetch(`${api}comments/${id}`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(res => (
        res.json()
    ))
}

const voteComment = (id, option) => {
    return fetch(`${api}comments/${id}`, {
        method: 'POST',
        body: JSON.stringify({option}),
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(res => (
        res.json()
    ))
}

const editComment = (id, comment) => {
    return fetch(`${api}comments/${id}`,{
        method: 'PUT',
        headers: {
            comment,
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {...comment})
    }).then(res => (
        res.json()
    ))
}

const deleteComment = (id) => {
    return fetch(`${api}comments/${id}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(res => (
        res.json()
    ))
}

export { getAllComments, deleteComment, editComment, voteComment, addComment, getComment}
