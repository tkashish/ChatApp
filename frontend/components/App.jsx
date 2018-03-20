import React, {Component} from 'react';
import {Container, Grid, Image} from 'semantic-ui-react';
import AuthenticationSection from './authentication/AuthenticationSection.jsx';
import AppSection from './AppSection.jsx';
import Socket from '../socket.js';
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      channels: [],
      users: [],
      errors: '',
      connected: false,
      activeChannel: {
        name: ''
      },
      showAddUserForm: true,
      authenticationError : [],
      signupError : [],
      user : {},
      authenticated : false,
      messages: [],
    };
  }

  authenticate(email, password){
    var authenticationError = [];
    let {user} = this.state;
    if(user.email != email){
      authenticationError.push("Invalid email")
    }
    if(user.password != password){
      authenticationError.push("Incorrect password")
    }
    this.setState({authenticationError});
    if(authenticationError.length == 0){
      let cred = {
        "email":email,
        "password":password
      };
      // make a request to server
      let {authenticated} = this.state;
      authenticated = true;
      this.setState({authenticated});
    }
  }

  signup(firstName, lastName, email, password, avatarUrl ,resetToSignIn){
    let user = this.state.user;
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    user.avatarUrl = avatarUrl;
    this.setState({user})
    var signupError = [];
    if(signupError.length == 0){
      resetToSignIn();
    }
  }

  resetErrorsOnSignin(){
    var authenticationError = [];
    this.setState({authenticationError});
  }

  isMessageFromCurrentUser(author){
      if(author == this.state.activeUser){
          return true;
      }
      return false;
  }

  addChannel(name){
    this.serviceSocket.emit('channel add', {name});
  }
  setChannel(activeChannel){
    this.setState({activeChannel});
    this.serviceSocket.emit('message unsubscribe');
    this.setState({messages: []});
    this.serviceSocket.emit('message subscribe', {
      channelId: activeChannel.id
    });
  }
  addUser(name){
    if(this.state.activeUser != null){
      return
    }
    let activeUser = name
    this.setState({activeUser});
    this.serviceSocket.emit('user add', {name});
    this.setState({
      showAddUserForm: false
    })
  }
  setUser(activeUser){
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
      this.serviceSocket.emit('message add', {message});
    }
    this.setState({errors});
  }

  componentDidMount(){
    let serviceWS = new WebSocket('ws://'+SERVICE_URL);
    let serviceSocket = this.serviceSocket = new Socket(serviceWS);
    serviceSocket.on('connect',     this.onConnect.bind(this));
    serviceSocket.on('disconnect',  this.onDisconnect.bind(this));
    serviceSocket.on('channel add', this.onAddChannel.bind(this));
    serviceSocket.on('user add',    this.onAddUser.bind(this));
    serviceSocket.on('user edit',   this.onEditUser.bind(this));
    serviceSocket.on('user remove', this.onRemoveUser.bind(this));
    serviceSocket.on('message add', this.onMessageAdd.bind(this));
  }

  onAddChannel(channel){
    let {channels} = this.state;
    channels.push(channel);
    this.setState({channels});
  }

  onMessageAdd(message){
      let {messages} = this.state;
      messages.push(message);
      this.setState({messages})
  }

  onRemoveUser(removeUser){
    let {users} = this.state;
    users = users.filter( user => {
      return removeUser.id != user.id;
    });
    this.setState({users});
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
    this.serviceSocket.emit('channel subscribe');
    this.serviceSocket.emit('user subscribe');
  }

  onDisconnect(){
    this.setState({connected: false});
  }

  render(){
    var app = null;
    // if ( this.state.authenticated ){
    if ( true ){
      app = <AppSection
                channels={this.state.channels}
                addChannel={this.addChannel.bind(this)}
                setChannel={this.setChannel.bind(this)}
                addMessage={this.addMessage.bind(this)}
                messages={this.state.messages}
                isMessageFromCurrentUser={this.isMessageFromCurrentUser.bind(this)}
                users={this.state.users}
                addUser={this.addUser.bind(this)}
                setUser={this.setUser.bind(this)}
                showAddUserForm={this.state.showAddUserForm}
              />;
    } else {
      app = <AuthenticationSection
        authenticate={this.authenticate.bind(this)}
        authenticationError={this.state.authenticationError}
        resetErrorsOnSignin={this.resetErrorsOnSignin.bind(this)}
        signup={this.signup.bind(this)}
      />;
    }
    return(
        <Container fluid style={{minWidth: '100%'}}>
          {app}
        </Container>
    )
  }
}

export default App;
