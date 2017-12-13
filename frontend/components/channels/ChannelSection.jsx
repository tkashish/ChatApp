import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ChannelForm from './ChannelForm.jsx';
import ChannelList from './ChannelList.jsx';
import {Card, Label} from 'semantic-ui-react';

class ChannelSection extends Component{
  render(){
    return(
      <Card fluid color='blue' style={cardStyle}>
        <br/>
        <Card.Header>
          <Label color='blue' size='big' attached='top'>Channels</Label>
        </Card.Header>
        <br/>
        <Card.Content style={listStyle}>
          <ChannelList
            channels={this.props.channels}
            setChannel={this.props.setChannel}
          />
        </Card.Content>
        <Card.Content extra>
          <ChannelForm
          addChannel={this.props.addChannel}
          />
        </Card.Content>
      </Card>
    )
  }
}

var cardStyle = {
  height : '50%'
};

var listStyle = {
  overflow : 'auto'
};

ChannelSection.propTypes = {
    channels: PropTypes.array.isRequired,
    setChannel: PropTypes.func.isRequired,
    addChannel: PropTypes.func.isRequired
}

export default ChannelSection
