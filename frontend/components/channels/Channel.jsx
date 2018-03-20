import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

class Channel extends Component{
	onClick(e){
		e.preventDefault();
		const {setChannel, channel} = this.props;
		setChannel(channel);
	}
	render(){
    const {channel} = this.props;
		return(
			<List.Item
        style={itemStyle}
				as='a'
				onClick={this.onClick.bind(this)}
				>
					{channel.name}
			</List.Item>
		)
	}
}

Channel.propTypes = {
	channel: PropTypes.object.isRequired,
	setChannel: PropTypes.func.isRequired
}

var itemStyle = {
  color: 'black',
  borderRadius: '0em',
  paddingTop: '10px',
  paddingBottom: '10px',
  borderBottom: '1px solid lightgrey',
  paddingLeft: '20px',
}

export default Channel
