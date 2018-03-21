import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';
import {Comment, Card, Label, Grid} from 'semantic-ui-react';

class MessageSection extends Component{
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
    return(
      <div
        style={cardStyle}
        ref={(el) => { this.messagesEnd = el; }}>
        <div style={listStyle}>
          <MessageList
            messages={this.props.messages}
            isMessageFromCurrentUser={this.props.isMessageFromCurrentUser}
          />
        </div>
        <div style={formStyle}>
          <MessageForm
            addMessage={this.props.addMessage}
          />
        </div>
      </div>
    )
  }
}

MessageSection.propTypes = {
  messages: PropTypes.array.isRequired,
  addMessage: PropTypes.func.isRequired,
  isMessageFromCurrentUser: PropTypes.func.isRequired,
}

var cardStyle = {
  display: 'block',
  height : '100%'
};
var listStyle = {
  height: '95%',
  boxSizing: 'border-box',
  overflowX: 'hidden',
  overflowY: 'auto',
  position: 'relative'
};


var formStyle = {
  position: 'absolute',
  height: '5%',
  width: '100%',
};

var messageListStyle = {
  maxWidth: 'none'
}
export default MessageSection
