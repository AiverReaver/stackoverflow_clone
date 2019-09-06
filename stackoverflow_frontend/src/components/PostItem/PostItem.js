import React from 'react';
import { Link } from 'react-router-dom';
import { Item, Label } from 'semantic-ui-react';

class PostItem extends React.Component {
    componentDidMount() {}

    render = () => {
        return (
            <Item>
                <Item.Content>
                    <Item.Header>
                        <Link to={`questions/${this.props.post.id}`}>
                            {this.props.post.title}
                        </Link>
                    </Item.Header>
                    <Item.Meta>vote view answer</Item.Meta>
                    <Item.Description>
                        {this.props.post.description}
                    </Item.Description>
                    <Item.Extra>
                        <p class="ui primary right floated ">
                            Buy tickets
                            <i
                                aria-hidden="true"
                                class="right chevron icon"
                            ></i>
                        </p>
                        <Label>IMAX</Label>
                    </Item.Extra>
                </Item.Content>
            </Item>
        );
    };
}

export default PostItem;
