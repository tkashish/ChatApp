import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Form} from 'semantic-ui-react';

class MessageForm extends Component{
  onSubmit(e){
    if(e.key === 'Enter'){
      e.preventDefault();
      const messageContent  = e.target.value;
      if(messageContent != ''){
        this.props.addMessage(messageContent);
      }
      e.target.value = ''
    }
  }
  render(){
    return(
      <Form style={formStyle}>
        <Form.Field style={{height: '100%'}}>
          <Form.TextArea
            style={formInputStyle}
            placeholder='Type Message'
            type='text'
            onKeyUp={this.onSubmit.bind(this)}
          />
        </Form.Field>
      </Form>
    )
  }
}

MessageForm.propTypes={
  addMessage: PropTypes.func.isRequired,
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

export default MessageForm
