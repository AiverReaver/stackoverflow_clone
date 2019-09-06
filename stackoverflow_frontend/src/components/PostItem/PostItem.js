import React from 'react';

class PostItem extends React.Component {
    constructor(props) {
        super();
    }

    componentDidMount() {}

    render = () => {
        return <div>{this.props.post.title}</div>;
    };
}

export default PostItem;
