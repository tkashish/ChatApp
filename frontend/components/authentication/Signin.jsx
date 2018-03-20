import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Message, Icon} from 'semantic-ui-react';

class Signin extends Component{

  onSubmit(e){
    e.preventDefault();
    const emailNode = this.refs.email;
    const passwordNode = this.refs.password;
    this.props.authenticate(emailNode.value, passwordNode.value);
  }

  switchToSignUp(e){
    e.preventDefault();
    this.props.switchToSignUp()
  }

  render(){
    var errorMessage = null
    if(this.props.authenticationError.length != 0){
      errorMessage = <Message error list={this.props.authenticationError}/>
    }
    return (
      <Form error onSubmit={this.onSubmit.bind(this)}>
        <Form.Field style={formField}>
          <input required style={formItem}
            placeholder='Email'
            ref='email'
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
            title="Invalid Email"
          />
        </Form.Field>
        <Form.Field style={formField}>
          <input required style={formItem}
            type='password'
            placeholder='Password'
            ref='password'
          />
        </Form.Field>
        <Form.Field style={formButton}>
          <Button style={formItem} type='submit'>Signin</Button>
          <Button style={formItem} onClick={this.switchToSignUp.bind(this)}>
            Signup
            <Icon name='right arrow' />
          </Button>
        </Form.Field>
        {errorMessage}
      </Form>
    )
  }
}

var formItem = {
  borderRadius: '5rem',
  textAlign: 'center'
}

var formField = {
  paddingTop: '20px'
}

var formButton = {
  textAlign: 'center',
  paddingTop: '20px'
}

Signin.propTypes = {
  authenticate: PropTypes.func.isRequired,
  authenticationError : PropTypes.array.isRequired,
  switchToSignUp : PropTypes.func.isRequired,
}

export default Signin;
