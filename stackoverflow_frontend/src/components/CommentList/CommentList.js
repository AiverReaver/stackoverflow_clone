import React from 'react';
import { Comment } from 'semantic-ui-react';
import Moment from 'react-moment';

class CommentList extends React.Component {
    componentDidMount() {}
    render() {
        const { comments } = this.props;

        const commentsEle = comments.map((comment, index) => {
            return (
                <Comment key={index}>
                    <Comment.Content>
                        <Comment.Text>
                            {comment.body} - {comment.owner.name}{' '}
                            <Moment fromNow>{comment.created_at}</Moment>
                        </Comment.Text>
                    </Comment.Content>
                </Comment>
            );
        });

        return (
            <div className="comments-custom">
                <Comment.Group size="mini">{commentsEle}</Comment.Group>
            </div>
        );
    }
}

export default CommentList;
