import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UserForm from './UserForm.jsx';
import UserList from './UserList.jsx';
import {Card, Label} from 'semantic-ui-react';

class UserSection extends Component{
  render(){
    var AddUserForm = null

    if(this.props.showAddUserForm){
      AddUserForm =  <Card.Content extra>
                      <UserForm
                      addUser={this.props.addUser}
                      />
                    </Card.Content>
    }
    return(
      <Card fluid color='blue' style={cardStyle}>
        <br/>
        <Card.Header>
          <Label color='blue' size='big' attached='top'>Users</Label>
        </Card.Header>
        <br/>
        <Card.Content style={listStyle}>
          <UserList
            users={this.props.users}
            setUser={this.props.setUser}
          />
        </Card.Content>
        {AddUserForm}
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

UserSection.propTypes = {
    users: PropTypes.array.isRequired,
    setUser: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired,
    showAddUserForm: PropTypes.bool.isRequired,
}

export default UserSection
