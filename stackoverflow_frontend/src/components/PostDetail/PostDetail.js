import React from 'react';
import { connect } from 'react-redux';
import { Header, Label, Loader, Divider } from 'semantic-ui-react';

import { fetchPostDetails } from '../../actions';
import CommentList from '../CommentList/CommentList';
import CreateAnswer from '../CreateAnswer/CreateAnswer';
import Moment from 'react-moment';
import CreateComment from '../CreateComment/CreateComment';

class PostDetail extends React.Component {
    state = { body: '' };

    componentDidMount() {
        this.props.fetchPostDetails(this.props.match.params.id);
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value });

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
                    <CreateComment isForPost={false} id={answer.id} placeholder="Use comments to ask for more information or suggest improvements. Avoid comments like “+1” or “thanks”." />
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
                    <CreateComment isForPost={true} id={post.data.id} placeholder="Use comments to ask for more information or suggest improvements. Avoid answering questions in comments." />
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
    fetchPostDetails
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(PostDetail);
