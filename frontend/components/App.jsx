import React, {Component} from 'react';
import ChannelSection from './channels/ChannelSection.jsx';
import UserSection from './users/UserSection.jsx';
import MessageSection from './messages/MessageSection.jsx';
import {Grid, Segment, Container, Divider, Message, Table} from 'semantic-ui-react';
import Socket from '../socket.js';
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      channels: [],
      users: [],
      messages: [],
      errors: '',
      connected: false,
      activeChannel: {
        name: ''
      },
      showAddUserForm: true
    };
  }

  isMessageFromCurrentUser(author){
      if(author == this.state.activeUser){
          return true;
      }
      return false;
  }

  addChannel(name){
    this.socket.emit('channel add', {name});
  }
  setChannel(activeChannel){
    this.setState({activeChannel});
    this.socket.emit('message unsubscribe');
    this.setState({messages: []});
    this.socket.emit('message subscribe', {
      channelId: activeChannel.id
    });
  }
  addUser(name){
    if(this.state.activeUser != null){
      return
    }
    let activeUser = name
    this.setState({activeUser});
    this.socket.emit('user add', {name});
    this.setState({
      showAddUserForm: false
    })
  }
  setUser(activeUser){
    console.log(activeUser);
  }

  addMessage(message){
    var errors = [];
    if (this.state.activeUser == null) {
      errors.push("Please select a user");
    }
    if (this.state.activeChannel.name == '') {
      errors.push("Please select a Channel");
    }
    if(errors.length == 0){
      this.socket.emit('message add', {message});
    }
    this.setState({errors});
  }

  componentDidMount(){
    let ws = new WebSocket('ws://localhost:4000')
    let socket = this.socket = new Socket(ws);
    socket.on('connect', this.onConnect.bind(this));
    socket.on('disconnect', this.onDisconnect.bind(this));
    socket.on('channel add', this.onAddChannel.bind(this));
    socket.on('user add', this.onAddUser.bind(this));
    socket.on('user edit', this.onEditUser.bind(this));
    socket.on('user remove', this.onRemoveUser.bind(this));
    socket.on('message add', this.onMessageAdd.bind(this));
  }

  onAddChannel(channel){
    let {channels} = this.state;
    channels.push(channel);
    this.setState({channels});
  }

  onMessageAdd(message){
      console.log(message);
      let {messages} = this.state;
      messages.push(message);
      this.setState({messages})
  }

  onRemoveUser(removeUser){
    console.log(removeUser);
    let {users} = this.state;
    console.log(users);
    users = users.filter( user => {
      return removeUser.id != user.id;
    });
    console.log(users);
    this.setState({users});
    console.log(this.state.users);
  }

  onAddUser(user){
    let {users} = this.state;
    users.push(user);
    this.setState({users});
  }

  onEditUser(editUser){
    let {users} = this.state;
    users.map( user => {
      if(editUser.id == user.id){
        return editUser;
      }else{
        return user;
      }
    });
    this.setState({users});
  }

  onConnect(){
    this.setState({connected: true});
    this.socket.emit('channel subscribe');
    this.socket.emit('user subscribe');
  }

  onDisconnect(){
    this.setState({connected: false});
  }

  render(){
    const errors = this.state.errors;
    let errorMessage = null;
    if(errors.length != 0){
      errorMessage = <Message
                      error
                      header='Errors'
                      list={errors}
                      size='mini'
                    />
    }
    return(
      <Container fluid>
        <Grid padded style={{ height: '100%' }} >
          <Grid.Row>
            <Grid.Column width={6}>
              <ChannelSection
                   channels={this.state.channels}
                   addChannel={this.addChannel.bind(this)}
                   setChannel={this.setChannel.bind(this)}
              />
              <UserSection
                   users={this.state.users}
                   addUser={this.addUser.bind(this)}
                   setUser={this.setUser.bind(this)}
                   showAddUserForm={this.state.showAddUserForm}
              />
            </Grid.Column>
            <Grid.Column width={10}>
              {errorMessage}
              <MessageSection
                  activeChannel={this.state.activeChannel}
                  messages={this.state.messages}
                  addMessage={this.addMessage.bind(this)}
                  isMessageFromCurrentUser={this.isMessageFromCurrentUser.bind(this)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default App
