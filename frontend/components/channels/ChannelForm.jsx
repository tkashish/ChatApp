import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from 'semantic-ui-react';

class ChannelForm extends Component{
  onSubmit(e){
    e.preventDefault();
    const node = this.refs.channel;
    const channelName = node.value;
    if(channelName != ''){
      this.props.addChannel(channelName);
    }
    node.value = '';
  }
  render(){
    return(
      <Form
        style={formStyle}
        onSubmit={this.onSubmit.bind(this)}>
        <Form.Field style={{height: '100%'}}>
          <input
            style={formInputStyle}
            placeholder='Add Channel'
            type='text'
            ref='channel'/>
        </Form.Field>
      </Form>
    )
  }
}

ChannelForm.propTypes = {
  addChannel: PropTypes.func.isRequired
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

export default ChannelForm
