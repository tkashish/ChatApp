import React, {Component} from 'react';
import PropTypes from 'prop-types';
import User from './User.jsx';
import { List } from 'semantic-ui-react';

class UserList extends Component{
  render(){
    return(
      <List
        selection
        style={listStyle}
        animated
        verticalAlign='middle'
        size={'large'}
      >{
          this.props.users.map( (user, index) =>{
            return <User
              user={user}
              key={user.id}
              setUser={this.props.setUser}
              />
          })
        }</List>
    )
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  setUser: PropTypes.func.isRequired
}

var listStyle = {
  maxWidth: 'none',
  height: '100%'
}

export default UserList
