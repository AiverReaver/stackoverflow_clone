import React from 'react';
import { connect } from 'react-redux';
import { Header, Label, Loader } from 'semantic-ui-react';

import { fetchPostDetails } from '../../actions';

class PostDetail extends React.Component {
    componentDidMount() {
        this.props.fetchPostDetails(this.props.match.params.id);
    }
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

        const answers = post.data.answers.map(answer => <p>{answer.body}</p>);

        return (
            <div>
                <Header as="h2" dividing>
                    {post.data.title}
                </Header>
                <Header.Content>{post.data.description}</Header.Content>
                {tags}

                <Header as="h4">{numOfAnswers} Answers</Header>
                {answers}
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
