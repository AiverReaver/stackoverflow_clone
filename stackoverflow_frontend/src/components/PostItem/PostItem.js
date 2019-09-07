import React from 'react';
import { Link } from 'react-router-dom';
import { Item, Label } from 'semantic-ui-react';

class PostItem extends React.Component {
    componentDidMount() {}

    render() {
        const { post } = this.props;

        const tags = post.tags.map((tag, index) => {
            return <Label key={index}>{tag.name}</Label>;
        });

        return (
            <Item>
                <Item.Content>
                    <Item.Header>
                        <Link to={`questions/${post.id}`}>{post.title}</Link>
                    </Item.Header>
                    <Item.Meta>vote view answer</Item.Meta>
                    <Item.Extra>
                        <p className="ui primary right floated ">
                            user added date and name
                        </p>
                        {tags}
                    </Item.Extra>
                </Item.Content>
            </Item>
        );
    }
}

export default PostItem;
