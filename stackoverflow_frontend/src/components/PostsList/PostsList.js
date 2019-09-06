import React from 'react';
import { connect } from 'react-redux';
import { Item } from 'semantic-ui-react';

import PostItem from '../PostItem/PostItem';
import { fetchposts } from '../../actions';

class PostsList extends React.Component {
    componentDidMount() {
        this.props.fetchposts();
    }

    render = () => {
        const { posts } = this.props;

        if (posts !== undefined) {
            const postItem = posts.data.map(post => {
                return <PostItem key={post.id} post={post} />;
            });
            return <Item.Group>{postItem}</Item.Group>;
        }

        return <div>no questions</div>;
    };
}

const mapStateToProps = ({ postsReducer }) => {
    console.log(postsReducer);
    return {
        posts: postsReducer.posts
    };
};

export default connect(
    mapStateToProps,
    { fetchposts }
)(PostsList);
