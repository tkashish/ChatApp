import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Form} from 'semantic-ui-react';

class MessageForm extends Component{
  onSubmit(e){
    e.preventDefault();
    const node = this.refs.message;
    const messageContent  = node.value;
    if(messageContent != ''){
      this.props.addMessage(messageContent);
    }
    node.value = ''
  }
  render(){
    return(
      <Form attached='bottom' onSubmit={this.onSubmit.bind(this)}>
        <Form.Field>
          <input placeholder='Type Message' type='text' ref='message'/>
        </Form.Field>
      </Form>
    )
  }
}

MessageForm.propTypes={
  addMessage: PropTypes.func.isRequired,
}

export default MessageForm
