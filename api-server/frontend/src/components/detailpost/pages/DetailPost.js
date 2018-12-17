import React, { Component, Fragment } from 'react'
import { CardBody, Card, CardTitle, CardSubtitle, Collapse, Button } from 'reactstrap'
import { Link, Redirect} from 'react-router-dom'
import './detailPost.scss'
import { connect } from 'react-redux'
import { getPostById, votePost, removePost, getAllPosts, editPostDecrementCommentCount } from '../../../posts/actions'
import {getAllComments, voteComment, getCommentById, deleteComment} from '../../../comments/actions'


let timeoutPost = null;
let timeoutComment = null;

class DetailPost extends Component {

    constructor(){
        super()
        this.state = {
            postEdited: false,
            postToEdit: {},
            isOpen: false
        }
        this.handleTitleChanges = this.handleTitleChanges.bind(this)
        this.handleAuthorChanges = this.handleAuthorChanges.bind(this)
        this.handleBodyChanges = this.handleBodyChanges.bind(this)
        this.handleCategoryChanges = this.handleCategoryChanges.bind(this)
        this.toggle = this.toggle.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    handleTitleChanges(event){
        this.setState({title:event.target.value})
    }

    handleAuthorChanges(event){
        this.setState({author:event.target.value})
    }

    handleBodyChanges(event){
        this.setState({body:event.target.value})
    }

    handleCategoryChanges(event){
        this.setState({category:event.target.value})
    }

    votePost(id, option){
        clearTimeout(timeoutPost)
        timeoutPost = setTimeout(() => {
            this.props.votePostAction(id, option)
            this.props.getPostByIdAction(id)

        }, 250)
    }

    voteComment(id, option){
        clearTimeout(timeoutComment)
        timeoutComment = setTimeout(() => {
            this.props.voteCommentAction(id, option)
        }, 200)
        this.props.getAllCommentsAction(this.props.match.params.id)
    }

    deletePost(id){
        this.props.deletePostAction(id)
        this.setState({ postEdited: true })
    }

    deleteComment(id){
        this.props.deleteCommentAction(id)
        this.props.editPostDecrementCommentCount(this.props.match.params.id, this.props.post)
    }


    componentDidMount(){
        this.props.getPostByIdAction(this.props.match.params.id)
        this.props.getAllCommentsAction(this.props.match.params.id)
        this.props.initialPostsAction()
    }

    submitForm(event) {
        event.preventDefault()
        this.props.savePostAction(this.state)
        this.setState({ postEdited: true })
    }

    render(){
        const comments = this.checkComment()
        if (this.state.postEdited) {
            return (<Redirect to={'/'} />)
        }
        return(
            <Fragment>
                <div className="header-post">
                    Post Details
                </div>
                <div className="container-detail-post">
                    <Card>
                        <Button onClick={() => this.deletePost(this.props.post.id)} className="delete-post-button" size="sm" outline color="primary">
                            Delete
                        </Button>
                        <Button onClick={() => this.votePost(this.props.post.id,'upVote')} className="delete-post-button" size="sm" outline color="primary">
                            Like POST
                        </Button>
                        <Button onClick={() => this.votePost(this.props.post.id,'downVote')} className="delete-post-button" size="sm" outline color="primary">
                            Unlike POST
                        </Button>
                        <CardBody>
                            <CardTitle>
                                <div>Title</div>
                            </CardTitle>
                            <CardTitle>{this.props.post.title}</CardTitle>
                            <CardSubtitle>
                                <div>Author</div>
                            </CardSubtitle>
                            <CardSubtitle>{this.props.post.author}</CardSubtitle>
                            <div>Body</div>
                            <div>{this.props.post.body}</div>
                            <div>Score votes</div>
                            <div>{this.props.post.voteScore}</div>
                            <div>Comment numbers</div>
                            <div>{this.props.post.commentCount}</div>
                        </CardBody>
                    </Card>
                    <Button className="comments-button" color="secondary" onClick={() => this.toggle()}>Comments</Button>
                        <Collapse isOpen={this.state.isOpen}>
                            <Card>
                                <CardBody>
                                    <ol>
                                        {comments.length ? comments.map((comment, index) =>
                                            <li key={index} className="list-comments">
                                                <div>Time</div>
                                                <div>{comment.timestamp}</div>
                                                <div>Author</div>
                                                <div>{comment.author}</div>
                                                <div>Body</div>
                                                <div>{comment.body}</div>
                                                <div>Vote score</div>
                                                <div>{comment.voteScore}</div>
                                                <div>
                                                    <Button onClick={() => this.deleteComment(comment.id)} className="delete-post-button" size="sm" outline color="primary">
                                                        Delete
                                                    </Button>
                                                    <Link className="btn btn-primary button" to={`/comments/edit/${this.props.post.category}/${this.props.post.id}/${comment.id}`}>
                                                        Edit
                                                    </Link>
                                                    <Button onClick={() => this.voteComment(comment.id,'upVote')} className="delete-comment-button" size="sm" outline color="primary">
                                                        Like COMMENT
                                                    </Button>
                                                    <Button onClick={() => this.voteComment(comment.id,'downVote')} className="delete-comment-button" size="sm" outline color="primary">
                                                        Unlike COMMENT
                                                    </Button>
                                                </div>
                                            </li>
                                        ):(<div className="list-comments"><div className="cards-of-posts">There are no commnets yet in this post :(</div></div>)}
                                    </ol>
                                    <Link className="btn btn-primary button" to={`/comments/create/${this.props.post.category}/${this.props.post.id}`}>
                                        New Comment
                                    </Link>
                                </CardBody>
                            </Card>
                        </Collapse>
                    <Link className="btn btn-primary button" to={`/posts/edit/${this.props.post.id}`}>
                        Edit
                    </Link>
                    <Link className="btn btn-primary button" to={{pathname: '/', state: 'flushDeal'}}>
                        Back
                    </Link>
                </div>
            </Fragment>
        )
    }

    checkComment = () => {
        const { comment = [] } = this.props
        const filteredComments = comment.filter(comment => !comment.deleted)
        return filteredComments
    }

    toggle = () => {
        this.setState(({ isOpen }) => ({ isOpen: !isOpen }))
    }

}

function mapDispatchToProps(dispatch){
    return {
        deleteCommentAction: (id) => dispatch(deleteComment(id)),
        initialPostsAction: () => dispatch(getAllPosts()),
        deletePostAction: (id) => dispatch(removePost(id)),
        getPostByIdAction: (id) => dispatch(getPostById(id)),
        getAllCommentsAction:(id) => dispatch(getAllComments(id)),
        voteCommentAction:(id, option) => dispatch(voteComment(id, option)),
        getCommentByIdAction: (id) => dispatch(getCommentById(id)),
        votePostAction:(id, option) => dispatch(votePost(id, option)),
        editPostDecrementCommentCount:(id, post) => dispatch(editPostDecrementCommentCount(id, post)),
    }
}

function mapStateToProps(state){
    const filteredComments = state.comments.value.filter(comment => !comment.deleted)
    return {
        post: state.posts.post,
        comment: filteredComments
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost)
