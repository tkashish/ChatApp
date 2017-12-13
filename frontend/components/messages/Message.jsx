import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Comment } from 'semantic-ui-react';

class Message extends Component{
  render(){
      const {message} = this.props;
      var commentContext = <Comment.Content>
                             <Comment.Author as='a'>{message.author}</Comment.Author>
                             <Comment.Metadata>
                               <div>{message.createdAt}</div>
                             </Comment.Metadata>
                             <Comment.Text>{message.message}</Comment.Text>
                           </Comment.Content>;

      if(this.props.isMessageFromCurrentUser(message.author) == true){
        return(
          <Comment style={commentAlignment}>
            {commentContext}
          </Comment>
        )
      }else {
        return(
            <Comment>
              {commentContext}
            </Comment>
        )
      }
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  isMessageFromCurrentUser: PropTypes.func.isRequired,
}
var commentAlignment = {
  textAlign: 'right',
  marginBottom: '20px'
};
export default Message
