const api = 'http://localhost:3001/'


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': 'auth'
}

const editPost = (id, post) => {
    return fetch(`${api}posts/${id}`,{
        method: 'PUT',
        headers: {
            post,
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {...post})
    }).then(res => (
        res.json()
    ))
}

const getAllPosts = () => {
    return fetch(`${api}posts`, { headers })
        .then(res => res.json())
}

const removePost = (id) => {
    return fetch(`${api}posts/${id}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json())
}

const votePost = (id, option) => {
    return fetch(`${api}posts/${id}`, {
        method: 'POST',
        body: JSON.stringify({option}),
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json())
}

const getPostsByCategory = category =>{
    return fetch(`${api}${category}/posts`, { headers })
        .then((res) => res.json())}

const savePost = (post) => {
    return fetch(`${api}posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {...post, timestamp:new Date().toLocaleString(), id:Math.random().toString(36).substr(-8)
        } )
    }).then(res => (
        res.json()
    ))
}

const getPostById = (id) => {
    return fetch(`${api}posts/${id}`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }} )
        .then(res => (
            res.json()
        ))
    }

export { getAllPosts, getPostsByCategory, savePost, removePost, editPost, getPostById, votePost }
