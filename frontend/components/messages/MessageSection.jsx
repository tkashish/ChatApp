import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';
import {Comment, Card, Label} from 'semantic-ui-react';

class MessageSection extends Component{
  render(){
    return(
      // <Card fluid color='blue' style={cardStyle}>
      <div style={cardStyle}>
        <Label color='blue' size='big' attached='top'>{this.props.activeChannel.name}</Label>
        <br/><br/>
        <div style={listStyle}>
        {/* <Card.Content style={listStyle}> */}
          <Comment.Group  style={messageListStyle}>
            <MessageList
              messages={this.props.messages}
              isMessageFromCurrentUser={this.props.isMessageFromCurrentUser}
            />
          </Comment.Group>
        </div>
        {/* </Card.Content> */}
        {/* <Card.Content extra> */}
          <MessageForm addMessage={this.props.addMessage}/>
        {/* </Card.Content> */}
      </div>
      // </Card>
    )
  }
}

MessageSection.propTypes = {
  activeChannel: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  addMessage: PropTypes.func.isRequired,
  isMessageFromCurrentUser: PropTypes.func.isRequired,
}

var cardStyle = {
  display: 'block',
  height : '100%'
};
var listStyle = {
  overflowY : 'auto',
  marginTop: '10px',
  borderTop: 'none',
  height: '91%',
  maxWidth: 'none'
};

var messageListStyle = {
  maxWidth: 'none'
}
export default MessageSection
