import React from 'react';
import { connect } from 'react-redux';
import {
    Header,
    Label,
    Loader,
    Button,
    Form,
    TextArea
} from 'semantic-ui-react';

import { fetchPostDetails, createPostComment } from '../../actions';
import CommentList from '../CommentList/CommentList';
import CreateAnswer from '../CreateAnswer/CreateAnswer';
import Moment from 'react-moment';

class PostDetail extends React.Component {
    state = { isAddComment: false, body: '' };

    componentDidMount() {
        this.props.fetchPostDetails(this.props.match.params.id);
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = () => {
        this.props.createPostComment({
            ...this.state,
            id: this.props.post.data.id
        });
        this.setState({ isAddComment: false });
    };

    onCommentButtonClicked = () => {
        this.setState({ isAddComment: true });
    };
    renderCommentForm = () => {
        if (this.state.isAddComment) {
            return (
                <Form onSubmit={this.handleSubmit}>
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
        const { post } = this.props;

        let tags = [];

        if (post === undefined) {
            return <Loader active>Loading</Loader>;
        }

        const numOfAnswers = post.data.answers.length;

        tags = post.data.tags.map((tag, index) => (
            <Label key={index}>{tag.name}</Label>
        ));

        const answers = post.data.answers.map((answer, index) => {
            return (
                <p key={index}>
                    {answer.body} - answered{' '}
                    <Moment fromNow>{answer.created_at}</Moment> by{' '}
                    {answer.owner.name}
                </p>
            );
        });

        return (
            <div>
                <Header as="h2" dividing>
                    {post.data.title}
                </Header>
                <Header.Content>{post.data.description}</Header.Content>
                {tags}
                <Header as="h5">Comments</Header>
                <Header.Content>
                    <CommentList comments={post.data.comments} />
                    {this.renderCommentForm()}
                </Header.Content>
                <Header as="h4">{numOfAnswers} Answers</Header>
                {answers}
                <CreateAnswer postId={this.props.post.data.id} />;
            </div>
        );
    }
}

const mapStateToProps = ({ postsReducer }) => {
    return {
        post: postsReducer.postDetail
    };
};

const mapActionsToProps = {
    fetchPostDetails,
    createPostComment
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(PostDetail);
