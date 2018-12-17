import React, { Component, Fragment } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import './newComment.scss'
import { connect } from 'react-redux'
import { addComment } from '../../../comments/actions'
import {  editPostIncrementalCommentCount, getPostById, getAllPosts } from '../../../posts/actions'


class NewComment extends Component {

    constructor() {
        console.log('constructor')
        super()
        this.state = {
            commentPublished: false,
            title: '',
            author: '',
            body: '',
            category: ''
        }
        this.handleAuthorChanges = this.handleAuthorChanges.bind(this)
        this.handleBodyChanges = this.handleBodyChanges.bind(this)
        this.handleCategoryChanges = this.handleCategoryChanges.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    handleAuthorChanges(event) {
        this.setState({ author: event.target.value })
    }

    handleBodyChanges(event) {
        this.setState({ body: event.target.value })
    }

    componentDidMount(){
        console.log('component did mount')
        console.log(this.props)
        this.props.getPostByIdAction(this.props.match.params.id)
        this.props.initialPostsAction()
    }

    handleCategoryChanges(event) {
        this.setState({ category: event.target.value })
    }

    submitForm(event) {
        console.log(this.props.post)
        event.preventDefault()
        console.log(this.props.post)
        this.props.saveCommentAction(this.state, this.props.match.params.id)
        this.props.editPostIncrementalCommentCount(this.props.match.params.id, this.props.post)
        this.setState({ commentPublished: true })
    }
    render() {
        console.log('render')
        if (this.state.commentPublished) {
            return (<Redirect to={`/${this.props.match.params.category}/${this.props.match.params.id}`} />)
        } else {
            return(<Fragment>
                <div className="header-post">
                    Create COMMENT
                </div>
                <div className="container-new-post">
                    <Form onSubmit={this.submitForm}>
                        <FormGroup>
                            <Label>Author</Label>
                            <Input onChange={this.handleAuthorChanges}>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Comment body</Label>
                            <Input type="textarea" name="text" id="exampleText" onChange={this.handleBodyChanges}>
                            </Input>
                        </FormGroup>
                        <Button type="submit">Create</Button>
                        <Link to={`/${this.props.match.params.category}/${this.props.match.params.id}`}>
                            <Button>Cancel</Button>
                        </Link>
                    </Form>
                </div>
            </Fragment>)
        }
    }
}

function mapDispatchToProps(dispatch) {
    console.log('dispatch')
    return {
        initialPostsAction: () => dispatch(getAllPosts()),
        getPostByIdAction: (id) => dispatch(getPostById(id)),
        editPostIncrementalCommentCount:(id, post) => dispatch(editPostIncrementalCommentCount(id, post)),
        saveCommentAction: (comment, idPost) => dispatch(addComment(comment, idPost))
    }
}

function mapStateToProps(state) {
    console.log('state to props')
    return {
        post: state.posts.post,
        comment: state.comments.value
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewComment)
