import React, { Component, Fragment } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { Redirect, Link } from 'react-router-dom'
import './editPost.scss'
import { connect } from 'react-redux'
import { getPostById, editPost, getAllPosts } from '../../../posts/actions'


class EditPost extends Component {

    constructor(){
        super()
        this.state = {
            postEdited: false,
            id: '',
            title: '',
            author: '',
            body: '',
            category: '',
            timestamp: null,
            voteScore: null,
            deleted: undefined,
            commentCounts: null
        }
        this.handleTitleChanges = this.handleTitleChanges.bind(this)
        this.handleAuthorChanges = this.handleAuthorChanges.bind(this)
        this.handleBodyChanges = this.handleBodyChanges.bind(this)
        this.handleCategoryChanges = this.handleCategoryChanges.bind(this)
        this.submitEditedForm = this.submitEditedForm.bind(this)
    }

    handleTitleChanges(event) {
        this.setState({ title: event.target.value })
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
        this.props.getPostByIdAction(this.props.match.params.id)
        this.props.initialPostsAction()
    }

    submitEditedForm(event) {
        event.preventDefault()
        this.props.editPostAction(this.state.id, this.state)
        this.setState({ postEdited: true })
    }

    update(edittedCategory){
        this.setState(
            {category: edittedCategory}
        )
    }

    static getDerivedStateFromProps(nextProps, prevState){
        console.log('prev state', prevState)
        console.log('next props', nextProps)
        if(nextProps.post.title !== undefined){
            if((prevState.title !== '' && nextProps.post.title !== prevState.title)
                || (prevState.author !== '' && nextProps.post.author !== prevState.author)
                || (prevState.body !== '' && nextProps.post.body !== prevState.body)
                || (prevState.category !== '' && nextProps.post.category !== prevState.category)){
                return{
                    title:prevState.title,
                    author:prevState.author,
                    body:prevState.body,
                    category:prevState.category
                }
            }
            return{
                id:nextProps.post.id,
                timestamp:nextProps.post.timestamp,
                title:nextProps.post.title,
                author:nextProps.post.author,
                body:nextProps.post.body,
                category:nextProps.post.category,
                commentCounts:nextProps.post.commentCounts,
                voteScore:nextProps.post.voteScore
            }
        }

    }

    render(){
        if (this.state.postEdited) {
            return (<Redirect to={'/'} />)
        }else{
            return(
                <Fragment>
                    <div className="header-post">
                        edição do POST
                    </div>
                    <div className="container-detail-post">
                        <Form onSubmit={this.submitEditedForm}>
                            <FormGroup>
                                <Label>Título</Label>
                                <Input type="text" onChange={this.handleTitleChanges} defaultValue={this.state.title}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Autor</Label>
                                <Input type="text" onChange={this.handleAuthorChanges} defaultValue={this.state.author}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Conteúdo do Post</Label>
                                <Input type="text" onChange={this.handleBodyChanges} defaultValue={this.state.body}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Categoria</Label>
                                <Input
                                    type="select"
                                    name="select"
                                    value={this.state.category}
                                    onChange={(event) => this.update(event.target.value)}
                                    >
                                    <option value="react">React</option>
                                    <option value="redux">Redux</option>
                                    <option value="udacity">Udacity</option>
                                </Input>
                            </FormGroup>
                            <Button type="submit">Finalizar edição</Button>
                            <Link className="btn btn-secondary udacity-button" to={`/${this.props.post.category}/${this.props.post.id}`}>Voltar</Link>
                        </Form>
                      </div>
                </Fragment>
            )

        }
    }
}

function mapDispatchToProps(dispatch){
    return {
        initialPostsAction: () => dispatch(getAllPosts()),
        editPostAction: (id, post) => dispatch(editPost(id, post)),
        getPostByIdAction: (id) => dispatch(getPostById(id))
    }
}

function mapStateToProps(state){
    return {
        post: state.posts.post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
