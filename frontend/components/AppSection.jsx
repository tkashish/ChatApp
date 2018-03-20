import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container, Grid, Image, Comment} from 'semantic-ui-react';
import MessageSection from './messages/MessageSection.jsx';
import ChannelSection from './channels/ChannelSection.jsx';
import UserSection from './users/UserSection.jsx';

class AppSection extends Component{
  render(){
    return(
          <Grid celled style={{ height: '100%', marginTop: '0px', marginBottom: '0px' }}>
            <Grid.Row style={{ height: '7%' }}>
              <Grid.Column width={16}>
                <div style={topBarStyle}>
                  <Image size='mini' circular src={"././avatars/small/josh.png"}/>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ height: '93%',background: 'white' }}>
              <Grid.Column width={3} style={{overflow: 'hidden', padding: '0em'}}>
                <ChannelSection
                     channels={this.props.channels}
                     addChannel={this.props.addChannel.bind(this)}
                     setChannel={this.props.setChannel.bind(this)}
                />

              </Grid.Column>
              <Grid.Column width={10} style={{overflow: 'hidden', padding: '0em'}}>
                <MessageSection
                  messages={this.props.messages}
                  addMessage={this.props.addMessage}
                  isMessageFromCurrentUser={this.props.isMessageFromCurrentUser}
                />
              </Grid.Column>
              <Grid.Column width={3} style={{overflow: 'hidden', padding: '0em'}}>
                <UserSection
                     users={this.props.users}
                     addUser={this.props.addUser}
                     setUser={this.props.setUser}
                     showAddUserForm={this.props.showAddUserForm}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )
  }
}

var topBarStyle = {
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)'
}

var messageListStyle = {
  maxWidth: 'none'
}

var listStyle = {
  overflowY : 'auto',
  marginTop: '10px',
  borderTop: 'none',
  height: '96%',
  maxWidth: 'none'
};

AppSection.propTypes = {
  // activeChannel: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  addMessage: PropTypes.func.isRequired,
  isMessageFromCurrentUser: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  setUser: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  showAddUserForm: PropTypes.bool.isRequired,
  channels: PropTypes.array.isRequired,
  setChannel: PropTypes.func.isRequired,
  addChannel: PropTypes.func.isRequired
}

export default AppSection;
