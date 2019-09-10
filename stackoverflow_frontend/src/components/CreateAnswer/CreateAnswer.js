import React from 'react';
import { connect } from 'react-redux';
import { Header, Form, Button, TextArea } from 'semantic-ui-react';

import { createPostAnswer } from '../../actions';

class CreateAnswer extends React.Component {
    state = { body: '' };

    handleSubmit = () => {
        this.props.createPostAnswer({
            ...this.state,
            id: this.props.postId
        });
    };
    handleChange = (e, { name, value }) => this.setState({ [name]: value });
    render() {
        return (
            <div>
                <Header as="h4"> Your Answer</Header>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field
                        name="body"
                        control={TextArea}
                        width="8"
                        onChange={this.handleChange}
                    />
                    <Button type="submit" primary content="Post Your Answer" />
                </Form>
            </div>
        );
    }
}

export default connect(
    null,
    { createPostAnswer }
)(CreateAnswer);
