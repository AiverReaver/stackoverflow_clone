import React from 'react';

class PostItem extends React.Component {
    post = {};

    constructor(props) {
        super();

        this.post = props.post;
    }

    componentDidMount() {}

    render = () => {
        return <div>ahah</div>;
    };
}

export default PostItem;
