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

    handleSubmitComment = (isForPost, id) => {
        if (isForPost) {
            this.props.createPostComment({
                ...this.state,
                id
            });
        } else {
            this.props.createAnswerComment({
                ...this.state,
                id
            });
        }
        this.setState({ isAddComment: false });
    };

    renderCommentForm = (isForPost, id) => {
        if (this.state.isAddComment) {
            if (isForPost) {
                return (
                    <Form
                        onSubmit={() => this.handleSubmitComment(isForPost, id)}
                    >
                        <Form.Group>
                            <Form.Field
                                name="body"
                                control={TextArea}
                                width="8"
                                placeholder="Use comments to ask for more information or suggest improvements. Avoid answering questions in comments."
                                onChange={this.handleChange}
                            />
                            <Form.Button primary content="Add Comment" />
                        </Form.Group>
                    </Form>
                );
            } else {
                return (
                    <Form
                        onSubmit={() => this.handleSubmitComment(isForPost, id)}
                    >
                        <Form.Group>
                            <Form.Field
                                name="body"
                                control={TextArea}
                                width="8"
                                placeholder="Use comments to ask for more information or suggest improvements. Avoid comments like “+1” or “thanks”."
                                onChange={this.handleChange}
                            />
                            <Form.Button primary content="Add Comment" />
                        </Form.Group>
                    </Form>
                );
            }
        }

        if (this.state.isAddComment && !isForPost) {
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
        const { isForPost, id } = this.props;
        return this.renderCommentForm(isForPost, id);
    }
}

export default connect(
    null,
    { createAnswerComment, createPostComment }
)(CreateComment);
