import React from 'react';
import { connect } from 'react-redux';
import { Input, Menu, Button } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

import { fetchposts, logoutUser } from '../../actions';

class Navbar extends React.Component {
    state = { activeItem: 'home' };

    handleItemClick = (e, { name }) => {
        this.props.history.push('/');
        this.setState({ activeItem: name });
    };

    onSearch = e => {
        this.props.fetchposts(1, e.target.value);
    };

    onLogoutClicked = () => {
        this.props.logoutUser();
    };

    renderUserButtons = () => {
        const { signed_in } = this.props;

        if (signed_in) {
            return (
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button onClick={this.onLogoutClicked}>Log out</Button>
                    </Menu.Item>
                </Menu.Menu>
            );
        } else {
            return (
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Link to="/login">
                            <Button>Log in</Button>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/register">
                            <Button primary>Sign up</Button>
                        </Link>
                    </Menu.Item>
                </Menu.Menu>
            );
        }
    };

    render() {
        const { activeItem } = this.state;
        return (
            <Menu secondary>
                <Menu.Item
                    name="home"
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item>
                    <Input
                        loading={this.props.isLoading}
                        icon="search"
                        onChange={this.onSearch}
                        placeholder="Search..."
                    />
                </Menu.Item>
                {this.renderUserButtons()}
            </Menu>
        );
    }
}

const mapStateToProps = ({ user, postsReducer }) => {
    return {
        signed_in: user.signed_in,
        isLoading: postsReducer.isQuery
    };
};

export default connect(
    mapStateToProps,
    { fetchposts, logoutUser }
)(withRouter(Navbar));
