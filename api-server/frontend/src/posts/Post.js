

class Post {

    constructor({ author, body, category, commentCount, deleted, id, timestamp, title, voteScore }) {
        this.body = body
        this.category = category
        this.author = author
        this.commentCount = commentCount
        this.deleted = deleted
        this.id = id
        this.timestamp = timestamp
        this.title = title
        this.voteScore = voteScore
    }

}

export default Post
