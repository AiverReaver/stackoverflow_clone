import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Dropdown } from 'semantic-ui-react';

import { fetchTags, createPost, isLognedIn } from '../../actions';

class CreatePost extends React.Component {
    state = {
        title: '',
        description: '',
        isFetching: false,
        tags: []
    };

    componentDidMount() {
        this.props.isLognedIn();

        if (!this.props.signed_in) {
            this.props.history.push('/login');
        }
    }

    componentDidUpdate() {
        if (this.props.postCreated) {
            this.props.history.push('/');
        }
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    };
    handleSearchChange = async (e, { searchQuery }) => {
        this.props.fetchTags(searchQuery);
    };
    onFormSubmit = () => {
        let post = this.state;

        post.tags = post.tags.map(tag => {
            return {
                name: tag
            };
        });

        this.props.createPost(post);
    };
    render() {
        const { tags } = this.state;

        let options = [];
        if (this.props.tags !== null) {
            options = this.props.tags.map(tag => {
                return { key: tag.name, value: tag.name, text: tag.name };
            });
        }
        return (
            <Form onSubmit={this.onFormSubmit}>
                <Form.Input
                    label="Title"
                    placeholder="Title"
                    name="title"
                    onChange={this.handleChange}
                />
                <Form.TextArea
                    label="Description"
                    placeholder="Description"
                    name="description"
                    onChange={this.handleChange}
                />
                <Form.Field>
                    <label>Tags</label>
                    <Dropdown
                        placeholder="State"
                        multiple
                        search
                        selection
                        name="tags"
                        value={tags}
                        loading={this.props.isFetching}
                        onChange={this.handleChange}
                        options={options}
                        onSearchChange={this.handleSearchChange}
                    />
                </Form.Field>
                <Button type="submit">Submit</Button>
            </Form>
        );
    }
}

const mapStateToProps = ({ tags, postsReducer, user }) => {
    return {
        isFetching: tags.isFetching,
        tags: tags.tags,
        postCreated: postsReducer.postCreated,
        signed_in: user.signed_in
    };
};

export default connect(
    mapStateToProps,
    { fetchTags, createPost, isLognedIn }
)(CreatePost);
