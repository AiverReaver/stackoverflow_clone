import React from 'react';
import { Link } from 'react-router-dom';
import { Item, Label } from 'semantic-ui-react';
import Moment from 'react-moment';

class PostItem extends React.Component {
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
                    <Item.Meta> {post.answers_count} answers</Item.Meta>
                    <Item.Extra>
                        <p className="ui primary right floated ">
                            asked <Moment fromNow>{post.created_at}</Moment>{' '}
                            {post.owner.name}
                        </p>
                        {tags}
                    </Item.Extra>
                </Item.Content>
            </Item>
        );
    }
}

export default PostItem;
