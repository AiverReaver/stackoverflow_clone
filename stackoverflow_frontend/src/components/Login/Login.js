import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { loginUser } from '../../actions';

class Login extends React.Component {
    state = { email: '', password: '', submited: false };

    componentDidUpdate() {
        if (this.props.signed_in) {
            this.props.history.push('/');
        }
    }

    onFormSubmit = () => {
        this.setState({ submited: true });
        this.props.loginUser(this.state);
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    render() {
        const { email, password, submited } = this.state;
        return (
            <Grid
                textAlign="center"
                style={{ height: '100vh' }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Form
                        size="large"
                        onSubmit={this.onFormSubmit}
                        loading={submited}
                    >
                        <Segment stacked>
                            <Form.Input
                                fluid
                                icon="user"
                                iconPosition="left"
                                name="email"
                                value={email}
                                placeholder="E-mail address"
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                name="password"
                                value={password}
                                placeholder="Password"
                                type="password"
                                onChange={this.handleChange}
                            />

                            <Button
                                type="submit"
                                color="primary"
                                fluid
                                size="large"
                            >
                                Login
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <Link to="/register">Sign up</Link>
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
    { loginUser }
)(Login);
