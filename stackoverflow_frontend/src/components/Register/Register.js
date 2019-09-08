import React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Form,
    Grid,
    Message,
    Segment,
    Header
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { registerUser } from '../../actions';

class Register extends React.Component {
    state = { name: '', email: '', password: '' };

    componentDidUpdate() {
        if (this.props.signed_in) {
            this.props.history.push('/');
        }
    }

    onFormSubmit = () => {
        this.props.registerUser(this.state);
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    render() {
        const { name, email, password } = this.state;
        return (
            <Grid
                textAlign="center"
                style={{ height: '100vh' }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="teal" textAlign="center">
                        Create your Stack Overflow account. It’s free and only
                        takes a minute.
                    </Header>
                    <Form size="large" onSubmit={this.onFormSubmit}>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                icon="user"
                                name="name"
                                value={name}
                                iconPosition="left"
                                placeholder="Name"
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                fluid
                                icon="user"
                                name="email"
                                value={email}
                                iconPosition="left"
                                placeholder="E-mail address"
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                fluid
                                icon="lock"
                                name="password"
                                value={password}
                                iconPosition="left"
                                placeholder="Password"
                                type="password"
                                onChange={this.handleChange}
                            />

                            <Button
                                type="submit"
                                color="teal"
                                fluid
                                size="large"
                            >
                                Login
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already have account? <Link to="/login">Sign In</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}

const mapStateToProps = ({ user }) => {
    return { signed_in: user.signed_in };
};

export default connect(
    mapStateToProps,
    { registerUser }
)(Register);
