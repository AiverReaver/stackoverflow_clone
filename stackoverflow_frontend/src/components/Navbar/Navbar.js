import React from 'react';
import { connect } from 'react-redux';
import { Input, Menu, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    state = { activeItem: 'home' };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    renderUserButtons = () => {
        const { signed_in } = this.props;

        if (signed_in) {
            return (
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button>Log out</Button>
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
                <Menu.Item
                    name="messages"
                    active={activeItem === 'messages'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name="friends"
                    active={activeItem === 'friends'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item>
                    <Input icon="search" placeholder="Search..." />
                </Menu.Item>
                {this.renderUserButtons()}
            </Menu>
        );
    }
}

const mapStateToProps = ({ user }) => {
    return {
        signed_in: user.signed_in
    };
};

export default connect(
    mapStateToProps,
    null
)(Navbar);
