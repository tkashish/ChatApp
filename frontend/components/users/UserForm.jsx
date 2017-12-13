import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from 'semantic-ui-react';

class UserForm extends Component{
  onSubmit(e){
    e.preventDefault();
    const node = this.refs.user;
    const userName = node.value;
    if(userName != ''){
      this.props.addUser(userName);
    }
    node.value = '';
  }
  render(){
    return(
      <Form onSubmit={this.onSubmit.bind(this)}>
        <Form.Field>
          <input placeholder='Add User' type='text' ref='user'/>
        </Form.Field>
      </Form>
    )
  }
}

UserForm.propTypes = {
  addUser: PropTypes.func.isRequired
}

export default UserForm
