import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Channel from './Channel.jsx';
import { List } from 'semantic-ui-react';

class ChannelList extends Component{
  render(){
    return(
      <List size={'big'}>{
          this.props.channels.map( (chan, index) =>{
            return <Channel
              channel={chan}
              key={chan.id}
              setChannel={this.props.setChannel}
              />
          })
        }</List>
    )
  }
}

ChannelList.propTypes = {
  channels: PropTypes.array.isRequired,
  setChannel: PropTypes.func.isRequired
}

export default ChannelList
