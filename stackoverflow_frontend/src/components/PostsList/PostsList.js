import React from 'react';
import { connect } from 'react-redux';
import { Item, Loader, Pagination } from 'semantic-ui-react';

import PostItem from '../PostItem/PostItem';
import { fetchposts } from '../../actions';

class PostsList extends React.Component {
    componentDidMount() {
        this.props.fetchposts();
    }
    handlePaginationChange = (e, { activePage }) => {
        this.props.fetchposts(activePage);
    };

    render = () => {
        const { posts } = this.props;

        if (posts !== undefined) {
            const postItem = posts.data.map(post => {
                return <PostItem key={post.id} post={post} />;
            });
            return (
                <div>
                    <Pagination
                        boundaryRange={0}
                        defaultActivePage={posts.meta.current_page}
                        siblingRange={2}
                        onPageChange={this.handlePaginationChange}
                        totalPages={posts.meta.last_page}
                    />
                    <Item.Group divided>{postItem}</Item.Group>
                </div>
            );
        }

        return <Loader active>Loading</Loader>;
    };
}

const mapStateToProps = ({ postsReducer }) => {
    return {
        posts: postsReducer.posts
    };
};

export default connect(
    mapStateToProps,
    { fetchposts }
)(PostsList);
