import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Signin from './Signin.jsx';
import Signup from './Signup.jsx';
import {Grid, Image, Segment, Container, Divider, Message, Table} from 'semantic-ui-react';

class AuthenticationSection extends Component{
  constructor(props){
    super(props);
    this.state = {
      signin : true
    };
  }

  switchToSignUp(){
    var signin = false;
    this.setState({signin});
  }

  switchToSignin(){
    this.props.resetErrorsOnSignin()
    var signin = true;
    this.setState({signin});
  }

  render(){
    var formtype = null
    if(this.state.signin){
      formtype = <Signin
        authenticate={this.props.authenticate}
        authenticationError={this.props.authenticationError}
        switchToSignUp={this.switchToSignUp.bind(this)}
      />
    }else{
      formtype = <Signup
        switchToSignin={this.switchToSignin.bind(this)}
        signup={this.props.signup}
      />
    }
    return(
      <Grid style={{ height: '100%' }} >
        <Grid.Column mobile={16} tablet={8} computer={4} style={columnStyle}>
          <Segment raised style={segmentStyle}>
            {formtype}
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

AuthenticationSection.propTypes = {
  authenticate: PropTypes.func.isRequired,
  authenticationError : PropTypes.array.isRequired,
  resetErrorsOnSignin : PropTypes.func.isRequired,
  signup : PropTypes.func.isRequired,
}

var columnStyle = {
  left: '50%',
  transform: 'translateX(-50%)'
}

var segmentStyle = {
  top: '50%',
  webkitTransform: 'translateY(-50%)'
}

export default AuthenticationSection;
