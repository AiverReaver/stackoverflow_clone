import React from 'react';
import { connect } from 'react-redux';

import PostItem from '../PostItem/PostItem';
import { fetchposts, fecthPostDetails } from '../../actions';

class PostsList extends React.Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        this.props.fetchposts();
        this.props.fecthPostDetails(1);
    }

    render = () => {
        const { posts } = this.props;

        if (posts !== undefined) {
            const postItem = posts.data.map(post => {
                return (
                    <div key={post.id}>
                        <PostItem post={post} />
                    </div>
                );
            });
            return <div>{postItem}</div>;
        }

        return <div>no post</div>;
    };
}

const mapStateToProps = ({ postsReducer }) => {
    console.log(postsReducer);
    return {
        posts: postsReducer.posts,
        postDetail: postsReducer.postDetail
    };
};

export default connect(
    mapStateToProps,
    { fetchposts, fecthPostDetails }
)(PostsList);
