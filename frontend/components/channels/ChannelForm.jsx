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
      <Form onSubmit={this.onSubmit.bind(this)}>
        <Form.Field>
          <input placeholder='Add Channel' type='text' ref='channel'/>
        </Form.Field>
      </Form>
    )
  }
}

ChannelForm.propTypes = {
  addChannel: PropTypes.func.isRequired
}

export default ChannelForm
