import React from 'react';
import axios from 'axios';

import PostItem from '../PostItem/PostItem';

class PostsList extends React.Component {
    state = { posts: [] };

    constructor(props) {
        super();
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts = () => {
        axios
            .get('http://localhost:8000/api/posts/')
            .then(posts => {
                this.setState({ posts: posts.data.data });
            })
            .catch(err => {
                console.error(err);
            });
    };

    render = () => {
        const postItem = this.state.posts.map(post => {
            return (
                <div key={post.id}>
                    <PostItem post={post} />
                </div>
            );
        });

        return <div> {postItem}</div>;
    };
}

export default PostsList;
