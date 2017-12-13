import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Message from './Message.jsx';
import { Comment } from 'semantic-ui-react';

class MessageList extends Component{
  render(){
    return(
      <Comment.Group style={listStyle}>{
        this.props.messages.map( message =>{
            return <Message
              message={message}
              key={message.id}
              isMessageFromCurrentUser={this.props.isMessageFromCurrentUser}
            />
        })
      }</Comment.Group>
    )
  }
}

MessageList.propTypes= {
  messages : PropTypes.array.isRequired,
  isMessageFromCurrentUser: PropTypes.func.isRequired,
}

var listStyle = {
  maxWidth: 'none',
  marginRight: '50px',
  marginLeft: '30px'
}

export default MessageList
