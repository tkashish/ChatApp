import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Message from './Message.jsx';
import { Comment } from 'semantic-ui-react';

class MessageList extends Component{
  scrollToBottom() {
    this.messagesEnd.scrollIntoView();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render(){
    const {messages} = this.props;
    messages.sort((m1,m2) => {
        return new Date(m1.createdAt).getTime() - new Date(m2.createdAt).getTime()
    })
    var formattedMessages = [];
      var isMessageFromUserOfPrevMessage = false;
    for(var i = 0; i < messages.length; i++){
      if(i > 0){
        isMessageFromUserOfPrevMessage = messages[i].author == messages[i-1].author;
      }
      formattedMessages.push(
        <Message
          message={messages[i]}
          key={messages[i].id}
          isMessageFromCurrentUser={this.props.isMessageFromCurrentUser}
          isMessageFromUserOfPrevMessage={isMessageFromUserOfPrevMessage}
        />
      )}
    return(
      <Comment.Group style={listStyle}>
        {formattedMessages}
        <div style={{ float:"left", clear: "both" }}
           ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </Comment.Group>
    )
  }
}

MessageList.propTypes= {
  messages : PropTypes.array.isRequired,
  isMessageFromCurrentUser: PropTypes.func.isRequired,
}

var listStyle = {
  maxWidth: 'none',
  marginRight: '15px',
  marginLeft: '15px',
  height: '100%'
}

export default MessageList
