import React, { Component, Fragment } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { Redirect, Link } from 'react-router-dom'
import './editComment.scss'
import { connect } from 'react-redux'
import { getCommentById, editComment } from '../../../comments/actions'
import { getAllPosts } from '../../../posts/actions'


class EditComment extends Component {

    constructor(){
        super()
        this.state = {
            commentEdited: false,
            id: '',
            author: '',
            body: '',
            timestamp: null,
            voteScore: null,
            deleted: undefined
        }
        this.handleAuthorChanges = this.handleAuthorChanges.bind(this)
        this.handleBodyChanges = this.handleBodyChanges.bind(this)
        this.handleCategoryChanges = this.handleCategoryChanges.bind(this)
        this.submitEditedForm = this.submitEditedForm.bind(this)
    }
    handleAuthorChanges(event) {
        this.setState({ author: event.target.value })
    }

    handleBodyChanges(event) {
        this.setState({ body: event.target.value })
    }

    handleCategoryChanges(event) {
        this.setState({ category: event.target.value })
    }

    componentDidMount(){
        console.log('component did mount')
        this.props.getCommentByIdAction(this.props.match.params.idComment)
        this.props.initialPostsAction()
    }

    submitEditedForm(event) {
        event.preventDefault()
        this.props.editCommentAction(this.state.id, this.state)
        this.setState({ commentEdited: true, author:'', body: '' })
    }

    update(edittedCategory){
        this.setState(
            {category: edittedCategory}
        )
    }

    static getDerivedStateFromProps(nextProps, prevState){
        console.log('get derived state from props')
        if(nextProps.comment.author !== undefined){
            console.log('primeiro if')
            if((prevState.author !== '' && nextProps.comment.author !== prevState.author)
                || (prevState.body !== '' && nextProps.comment.body !== prevState.body)){
                console.log('segundo if')
                return{
                    author:prevState.author,
                    body:prevState.body
                }
            }
            console.log('segundo if')
            return{
                id:nextProps.comment.id,
                timestamp:nextProps.comment.timestamp,
                author:nextProps.comment.author,
                body:nextProps.comment.body,
                voteScore:nextProps.comment.voteScore,
                parentId:nextProps.comment.parentId
            }

        }
        return null
    }

    render(){
        console.log(this.props)
        if (this.state.commentEdited) {
            return (<Redirect to={`/${this.props.match.params.category}/${this.props.match.params.idPost}`} />)
        }else{
            return(
                <Fragment>
                    <div className="header-post">
                        edição do COMMENT
                    </div>
                    <div className="container-detail-post">
                        <Form onSubmit={this.submitEditedForm}>
                            <FormGroup>
                                <Label>Autor</Label>
                                <Input type="text" onChange={this.handleAuthorChanges} defaultValue={this.state.author}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Conteúdo do Comment</Label>
                                <Input type="text" onChange={this.handleBodyChanges} defaultValue={this.state.body}/>
                            </FormGroup>
                            <Button type="submit">Finalizar edição</Button>
                            <Link className="btn btn-secondary udacity-button" to={`/${this.props.match.params.category}/${this.props.match.params.idPost}`}>Voltar</Link>
                        </Form>
                      </div>
                </Fragment>
            )

        }
    }
}

function mapDispatchToProps(dispatch){
    console.log('map dispatch props')
    return {
        initialPostsAction: () => dispatch(getAllPosts()),
        editCommentAction: (id, comment) => dispatch(editComment(id, comment)),
        getCommentByIdAction: (id) => dispatch(getCommentById(id))
    }
}

function mapStateToProps(state){
    return {
        comment: state.comments.comment,
        post: state.posts.post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComment)
