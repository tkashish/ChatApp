import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Channel from './Channel.jsx';
import { List } from 'semantic-ui-react';

class ChannelList extends Component{
  render(){
    return(
      <List
        selection
        style={listStyle}
        animated
        verticalAlign='middle'
        size={'large'}
      >{
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

var listStyle = {
  maxWidth: 'none',
  marginRight: '15px',
  marginLeft: '15px',
  height: '100%'
}


export default ChannelList
