import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Image } from 'semantic-ui-react';

class User extends Component{
  onClick(e){
		e.preventDefault();
		const {setUser, user} = this.props;
		setUser(user);
	}
  render(){
    const {user} = this.props;
		return(
			<List.Item
        style={itemStyle}
        as='a'
        onClick={this.onClick.bind(this)}
        >
        <Image avatar src='././avatars/large/chris.jpg' />
        <List.Content>
          {/* <List.Header as='a'>{user.name}</List.Header> */}
          {user.name}
        </List.Content>
			</List.Item>
		)
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired
}

var itemStyle = {
  color: 'black',
  borderRadius: '0em',
  paddingTop: '5px',
  paddingBottom: '5px',
  // borderBottom: '1px solid lightgrey',
  paddingLeft: '20px',
}

export default User
