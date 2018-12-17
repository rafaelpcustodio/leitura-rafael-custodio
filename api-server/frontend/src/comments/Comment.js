

class Comment {

    constructor({ author, body, deleted, id, parentDeleted, parentId, timestamp, voteScore }) {
        this.author = author
        this.body = body
        this.deleted = deleted
        this.id = id
        this.parentDeleted = parentDeleted
        this.parentId = parentId
        this.timestamp = timestamp
        this.voteScore = voteScore
    }

}

export default Comment
