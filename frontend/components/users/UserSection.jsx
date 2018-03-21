import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UserForm from './UserForm.jsx';
import UserList from './UserList.jsx';
import {Card, Label} from 'semantic-ui-react';

class UserSection extends Component{
  render(){
    return (
      <div style={cardStyle}>
        <div style={listStyle}>
          <UserList
           users={this.props.users}
           setUser={this.props.setUser}
          />
        </div>
        <div style={formStyle}>
          <UserForm
            addUser={this.props.addUser}
          />
        </div>
      </div>
    )
  }
}

var listStyle = {
  height: '95%',
  boxSizing: 'border-box',
  overflowX: 'hidden',
  overflowY: 'auto',
  position: 'relative'
};

var cardStyle = {
  display: 'block',
  height : '100%'
};

var formStyle = {
  position: 'absolute',
  height: '5%',
  width: '100%',
};

// var formStyle = {
//   position: 'absolute',
//   bottom : '10px'
// };

UserSection.propTypes = {
    users: PropTypes.array.isRequired,
    setUser: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired,
    showAddUserForm: PropTypes.bool.isRequired,
}

export default UserSection
