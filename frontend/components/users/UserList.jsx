import React, {Component} from 'react';
import PropTypes from 'prop-types';
import User from './User.jsx';
import { List } from 'semantic-ui-react';

class UserList extends Component{
  render(){
    return(
      <List animated verticalAlign='middle' size={'big'}>{
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

export default UserList
