import React from 'react';
import { connect } from 'react-redux';
import {
    Header,
    Label,
    Loader,
    Button,
    Form,
    TextArea,
    Divider
} from 'semantic-ui-react';

import {
    fetchPostDetails,
    createPostComment,
    createAnswerComment
} from '../../actions';
import CommentList from '../CommentList/CommentList';
import CreateAnswer from '../CreateAnswer/CreateAnswer';
import Moment from 'react-moment';

class PostDetail extends React.Component {
    state = { isAddPostComment: false, isAddAnswerComment: false, body: '' };

    componentDidMount() {
        this.props.fetchPostDetails(this.props.match.params.id);
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmitCommentPost = () => {
        this.props.createPostComment({
            ...this.state,
            id: this.props.post.data.id
        });
        this.setState({ isPostAddComment: false });
    };

    handleSubmitCommentAnswer = id => {
        this.props.createAnswerComment({
            ...this.state,
            id
        });
        this.setState({ isAnswerAddComment: false });
    };

    onPostCommentButtonClicked = () => {
        this.setState({ isPostAddComment: true });
    };

    onAnswerCommentButtonClicked = () => {
        this.setState({ isAnswerAddComment: true });
    };
    renderCommentForm = (isForPost, id) => {
        if (this.state.isPostAddComment && isForPost) {
            return (
                <Form onSubmit={this.handleSubmitCommentPost}>
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

        if (this.state.isAnswerAddComment && !isForPost) {
            return (
                <Form onSubmit={() => this.handleSubmitCommentAnswer(id)}>
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
                onClick={
                    isForPost
                        ? this.onPostCommentButtonClicked
                        : this.onAnswerCommentButtonClicked
                }
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

        const answers = post.data.answers.map(answer => {
            return (
                <div key={answer.id}>
                    <p>
                        {answer.body} - answered{' '}
                        <Moment fromNow>{answer.created_at}</Moment> by{' '}
                        {answer.owner.name}
                    </p>
                    <CommentList comments={answer.comments} />
                    {this.renderCommentForm(false, answer.id)}
                    <Divider />
                </div>
            );
        });

        return (
            <div>
                <Header as="h2" dividing>
                    {post.data.title}
                </Header>
                <Header.Content>{post.data.description}</Header.Content>
                {tags}
                <Header className="comments-custom" as="h5">
                    Comments
                </Header>
                <Header.Content>
                    <CommentList comments={post.data.comments} />
                    {this.renderCommentForm(true)}
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
    createPostComment,
    createAnswerComment
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(PostDetail);
