import React from 'react';
import { connect } from 'react-redux';

import { fetchPostDetails } from '../../actions';

class PostDetail extends React.Component {
    componentDidMount() {
        console.log('ass');
        this.props.fetchPostDetails(this.props.match.params.id);
    }
    render() {
        return <div>Post details</div>;
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
