import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

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
        as='a'
        onClick={this.onClick.bind(this)}
        >
					{user.name}
			</List.Item>
		)
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired
}

export default User
