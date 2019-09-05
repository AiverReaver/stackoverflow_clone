import React from 'react';
import { connect } from 'react-redux';

import PostItem from '../PostItem/PostItem';
import {
    fetchposts,
    fecthPostDetailsWithAnswerAndCommnets
} from '../../actions';

class PostsList extends React.Component {
    state = { posts: [] };

    constructor(props) {
        super();
    }

    componentDidMount() {
        this.props.fetchposts();
        this.props.fecthPostDetailsWithAnswerAndCommnets(1);
    }

    render = () => {
        // const postItem = this.state.posts.map(post => {
        //     return (
        //         <div key={post.id}>
        //             <PostItem post={post} />
        //         </div>
        //     );
        // });

        return <div> hello</div>;
    };
}

const mapStateToProps = ({ postsReducer }) => {
    console.log(postsReducer);
    return { posts: postsReducer.posts, postDetail: postsReducer.postDetail };
};

export default connect(
    mapStateToProps,
    { fetchposts, fecthPostDetailsWithAnswerAndCommnets }
)(PostsList);
