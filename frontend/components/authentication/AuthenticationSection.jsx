import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Signin from './Signin.jsx';
import Signup from './Signup.jsx';
import {Grid, Segment, Container, Divider, Message, Table} from 'semantic-ui-react';

class AuthenticationSection extends Component{
  constructor(props){
    super(props);
    this.state = {
      signin : true
    };
  }

  switchToSignUp(){
    var signin = false;
    this.setState({signin});
  }

  switchToSignin(){
    this.props.resetErrorsOnSignin()
    var signin = true;
    this.setState({signin});
  }

  render(){
    var segmentStyle = {
      maxHeight: '50%',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      minWidth: '400px'
    }
    var formtype = null
      if(this.state.signin){
        formtype = <Signin
          authenticate={this.props.authenticate}
          authenticationError={this.props.authenticationError}
          switchToSignUp={this.switchToSignUp.bind(this)}
        />
        var errLen = this.props.authenticationError.length
        if ( errLen == 0 ) {
          segmentStyle.maxHeight = '35%'
        } else {
          var h = 40 + 2.5*errLen;
          segmentStyle.maxHeight = h + "%"
        }
      }else{
        formtype = <Signup
          switchToSignin={this.switchToSignin.bind(this)}
          signup={this.props.signup}
        />
        segmentStyle.maxHeight = '80%'
      }
    return(
      <Grid padded style={{ height: '100%' }} >
        <Grid.Row>
          <Grid.Column width={5}>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment raised style={segmentStyle}>
              <br/>
              {formtype}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

AuthenticationSection.propTypes = {
  authenticate: PropTypes.func.isRequired,
  authenticationError : PropTypes.array.isRequired,
  resetErrorsOnSignin : PropTypes.func.isRequired,
  signup : PropTypes.func.isRequired,
}

export default AuthenticationSection;
