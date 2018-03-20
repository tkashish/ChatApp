import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Icon, Image, Header, Segment, Transition, Item} from 'semantic-ui-react';

class Signup extends Component{

  constructor(props){
    super(props);
    this.state = {
      visible : false,
      showForm: true,
      avatarImgSrc: '././avatars/stub.png',
    };
  }

  switchToSignin(e){
    e.preventDefault();
    this.props.switchToSignin()
  }

  onSubmit(e){
    e.preventDefault();
    const emailNode = this.refs.email;
    const passwordNode = this.refs.password;
    const firstNameNode = this.refs.firstName;
    const lastNameNode = this.refs.lastName;
    this.props.signup(firstNameNode.value,
      lastNameNode.value,
      emailNode.value,
      passwordNode.value,
      this.state.avatarImgSrc,
      this.props.switchToSignin
    )
  }

  toggleVisibility(e){
      e.preventDefault();
      let {visible} = this.state;
      visible = this.state.visible?false:true;
      this.setState({visible});
  }

  toggleShowForm(e){
    e.preventDefault();
    let showForm = this.state.showForm;
    showForm = showForm ? false : true;
    this.setState({showForm});
  }

  avatarOnHover(imgSrc){
    var avatarImgSrc = "././avatars/small/" + imgSrc;
    this.setState({avatarImgSrc});
  }

  avatarOnClick(imgSrc){
    var avatarImgSrc = "././avatars/small/" + imgSrc;
    this.setState({avatarImgSrc});
    let showForm = this.state.showForm;
    showForm = true;
    this.setState({showForm});
  }

  avatarOnMouseLeave(){
      var avatarImgSrc = "././avatars/stub.png";
      this.setState({avatarImgSrc});
  }

  getAvatarSegment(){
    return (
        <Segment vertical>
          <Item.Group>
            <Item.Image onClick={()=>this.avatarOnClick('josh.png')} onMouseLeave={this.avatarOnMouseLeave.bind(this)} onMouseEnter={()=>this.avatarOnHover('josh.png')} style={imageItemStyle} size='tiny' src='././avatars/small/josh.png' />
            <Item.Image onClick={()=>this.avatarOnClick('lena.png')} onMouseLeave={this.avatarOnMouseLeave.bind(this)} onMouseEnter={()=>this.avatarOnHover('lena.png')} style={imageItemStyle} size='tiny' src='././avatars/small/lena.png' />
            <Item.Image onClick={()=>this.avatarOnClick('matt.png')} onMouseLeave={this.avatarOnMouseLeave.bind(this)} onMouseEnter={()=>this.avatarOnHover('matt.png')} style={imageItemStyle} size='tiny' src='././avatars/small/matt.png' />
            <Item.Image onClick={()=>this.avatarOnClick('michael.png')} onMouseLeave={this.avatarOnMouseLeave.bind(this)} onMouseEnter={()=>this.avatarOnHover('michael.png')} style={imageItemStyle} size='tiny' src='././avatars/small/michael.png' />
            <Item.Image onClick={()=>this.avatarOnClick('steve.png')} onMouseLeave={this.avatarOnMouseLeave.bind(this)} onMouseEnter={()=>this.avatarOnHover('steve.png')} style={imageItemStyle} size='tiny' src='././avatars/small/steve.png' />
            <Item.Image onClick={()=>this.avatarOnClick('leah.jpg')} onMouseLeave={this.avatarOnMouseLeave.bind(this)} onMouseEnter={()=>this.avatarOnHover('leah.jpg')} style={imageItemStyle} size='tiny' src='././avatars/small/leah.jpg' />
          </Item.Group>
          <Button positive onClick={this.toggleShowForm.bind(this)}
            circular
            icon='arrow left' />
        </Segment>
    )
  }

  getForm(){
    return (
            <Segment vertical>
              <Form.Group style={formField} widths='equal'>
                <input required style={formItem} placeholder='First Name' ref='firstName'/>
                <input required style={formItem} placeholder='Last Name' ref='lastName'/>
              </Form.Group>
              <Form.Group style={formField}>
                <input id="emailInput" required style={formItem}
                  placeholder='Email'
                  ref='email'
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                  title="Invalid Email"
                />
              </Form.Group>
              <Form.Group style={formField}>
                <input required style={formItem} type='password'
                  placeholder='Password'
                  ref='password'
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                />
              </Form.Group>
              <Form.Field style={formButton}>
              <Button style={formItem} type='submit'>Signup</Button>
                <Button style={formItem} onClick={this.switchToSignin.bind(this)}>
                  <Icon name='left arrow' />
                  Signin
                </Button>
              </Form.Field>
           </Segment>
        )
  }

  render(){
    var seg = null;
    if(this.state.showForm){
      seg = this.getForm()
    }else{
      seg = this.getAvatarSegment()
    }
    return (
      <Form style={formStyle} onSubmit={this.onSubmit.bind(this)}>
        <Segment vertical style={headerStyle}>
          <Transition animation={'jiggle'} duration={800} visible={this.state.visible}>
            <Button style={imageButtonStyle} circular icon='upload' />
          </Transition>
          <Header size='huge'>
            <Image style={imageStyle} circular src={this.state.avatarImgSrc} onClick={this.toggleVisibility.bind(this)}/>
          </Header>
          <Transition animation={'jiggle'} duration={800} visible={this.state.visible}>
            <Button onClick={this.toggleShowForm.bind(this)}
              style={imageButtonStyle}
              circular
              icon='user' />
          </Transition>
        </Segment>
        <br/>
        {seg}
      </Form>
    )
  }
}

var imageItemStyle = {
  margin : '5px',
}

var headerStyle = {
  display: '-webkit-inline-box',
  borderBottom: 'none',
}

var imageStyle = {
  height: '150px',
  width: '150px'
}

var imageButtonStyle = {
  background: 'linear-gradient(to right, #cb356b, #bd3f32)',
  color: 'white'
}

var formStyle = {
  textAlign: 'center',
}

var formItem = {
  borderRadius: '5rem',
  textAlign: 'center',
  margin: '5px'
}

var formField = {
  paddingTop: '20px'
}

var formButton = {
  paddingTop: '20px'
}

Signup.propTypes = {
  switchToSignin : PropTypes.func.isRequired,
  signup : PropTypes.func.isRequired,
}

export default Signup;
