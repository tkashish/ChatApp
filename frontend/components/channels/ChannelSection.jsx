import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ChannelForm from './ChannelForm.jsx';
import ChannelList from './ChannelList.jsx';
import {Card, Label} from 'semantic-ui-react';

class ChannelSection extends Component{
  render(){
    return(
      <div
        style={cardStyle}>
        <div style={listStyle}>
          <ChannelList
            channels={this.props.channels}
            setChannel={this.props.setChannel}
          />
        </div>
        <div style={formStyle}>
          <ChannelForm
          addChannel={this.props.addChannel}
          />
        </div>
      </div>
    )
  }
}

var cardStyle = {
  display: 'block',
  height : '100%'
};

var listStyle = {
  height: '95%',
  boxSizing: 'border-box',
  overflowX: 'hidden',
  overflowY: 'auto',
  position: 'relative'
};


var formStyle = {
  position: 'absolute',
  height: '5%',
  width: '100%',
};

ChannelSection.propTypes = {
    channels: PropTypes.array.isRequired,
    setChannel: PropTypes.func.isRequired,
    addChannel: PropTypes.func.isRequired
}

export default ChannelSection
