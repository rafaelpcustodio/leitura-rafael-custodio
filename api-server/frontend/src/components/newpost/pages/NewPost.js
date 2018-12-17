import React, { Component, Fragment } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import './newPost.scss'
import { connect } from 'react-redux'
import { savePost } from '../../../posts/actions'


class NewPost extends Component {

    constructor() {
        super()
        this.state = {
            postPublished: false,
            title: '',
            author: '',
            body: '',
            category: ''
        }
        this.handleTitleChanges = this.handleTitleChanges.bind(this)
        this.handleAuthorChanges = this.handleAuthorChanges.bind(this)
        this.handleBodyChanges = this.handleBodyChanges.bind(this)
        this.handleCategoryChanges = this.handleCategoryChanges.bind(this)
        this.submitForm = this.submitForm.bind(this)
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

    componentDidMount() {
    }

    submitForm(event) {
        event.preventDefault()
        this.props.savePostAction(this.state)
        this.setState({ postPublished: true })
    }
    render() {
        if (this.state.postPublished) {
            return (<Redirect to={'/'} />)
        } else {
            return(<Fragment>
                <div className="header-post">
                    Create your POST
                </div>
                <div className="container-new-post">
                    <Form onSubmit={this.submitForm}>
                        <FormGroup>
                            <Label>POST title</Label>
                            <Input onChange={this.handleTitleChanges}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Author</Label>
                            <Input onChange={this.handleAuthorChanges}>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Cathegory</Label>
                            <Input type="select" name="select" id="exampleSelect" onChange={this.handleCategoryChanges}>
                                <option>Select an option...</option>
                                <option value="react">React</option>
                                <option value="redux">Redux</option>
                                <option value="udacity">Udacity</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Post Body</Label>
                            <Input type="textarea" name="text" id="exampleText" onChange={this.handleBodyChanges}>
                            </Input>
                        </FormGroup>
                        <Button type="submit">Create</Button>
                        <Link to={'/'}>
                            <Button>Cancel</Button>
                        </Link>
                    </Form>
                </div>
            </Fragment>)
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        savePostAction: (id) => dispatch(savePost(id))
    }
}

function mapStateToProps(state) {
    return {
        value: state.posts.value
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)
