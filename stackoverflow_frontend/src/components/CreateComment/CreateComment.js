import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, TextArea } from 'semantic-ui-react';

import { createPostComment, createAnswerComment } from '../../actions';

class CreateComment extends React.Component {
    state = { isAddComment: false, body: '' };

    onCommentButtonClicked = () => {
        this.setState({ isAddComment: true });
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmitComment = () => {
        const {isForPost, id, createPostComment, createAnswerComment} = this.props;
        if (isForPost) {
            createPostComment({
                ...this.state,
                id
            });
        } else {
            createAnswerComment({
                ...this.state,
                id
            });
        }
        this.setState({ isAddComment: false });
    };

    renderCommentForm = (isForPost, id) => {
        if (this.state.isAddComment) {
            
            return (
                <Form onSubmit={() => this.handleSubmitComment()}>
                    <Form.Group>
                        <Form.Field
                            name="body"
                            control={TextArea}
                            width="8"
                            placeholder={this.props.placeholder}
                            onChange={this.handleChange}
                        />
                        <Form.Button primary content="Add Comment" />
                    </Form.Group>
                </Form>
            );
            
        }

        return (
            <Button
                basic
                color="blue"
                content="add a comment"
                size="mini"
                onClick={this.onCommentButtonClicked}
            />
        );
    };

    render() {
        
        return this.renderCommentForm();
    }
}

export default connect(
    null,
    { createAnswerComment, createPostComment }
)(CreateComment);
