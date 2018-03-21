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
      <Form style={formStyle} onSubmit={this.onSubmit.bind(this)}>
        <Form.Field style={{height: '100%'}}>
          <input
            style={formInputStyle}
            placeholder='Add User'
            type='text'
            ref='user'/>
        </Form.Field>
      </Form>
    )
  }
}

UserForm.propTypes = {
  addUser: PropTypes.func.isRequired
}


var formStyle = {
  position: 'relative',
  height: '100%'
};

var formInputStyle = {
  height: '100%',
  border: '0px',
  borderRadius: '0px',
  borderTop: '1px solid rgba(34,36,38,.15)'
}

export default UserForm
