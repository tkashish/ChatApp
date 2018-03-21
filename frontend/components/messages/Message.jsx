import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Comment, Segment } from 'semantic-ui-react';

class Message extends Component{
  getTextStyle(){
    const{message} = this.props;
    if(this.props.isMessageFromCurrentUser(message.author)){
      return textStyleRight;
    }else{
      return textStyleLeft;
    }
  }

  getCommentStyle(mergeWithPrev, msgFrmCurrUsr){
    var commentStyle = {
      marginTop: '-15px',
      paddingTop: '0px'
    };
    if(!mergeWithPrev){
      commentStyle.marginTop= '0px';
      commentStyle.borderTop = '1px solid lightgrey';
      commentStyle.paddingTop = '10px';
    }
    if(msgFrmCurrUsr){
      commentStyle.textAlign= 'right';
    }else{
      commentStyle.textAlign= 'left';
    }
    return commentStyle;
  }

  getAvatar(mergeWithPrev, msgFrmCurrUsr){
    if(mergeWithPrev){
      return;
    }else{
      if(msgFrmCurrUsr){
        return (<Comment.Avatar as='div' src='././avatars/large/chris.jpg' style={currUserAvatarStyle}/>);
      }else{
        return (<Comment.Avatar as='div' src='././avatars/large/lena.png'/>)
      }
    }
  }

  render(){
      const {message} = this.props;
      var mergeWithPrev = this.props.isMessageFromUserOfPrevMessage;
      var commentAuthor = mergeWithPrev ? '' : (<Comment.Author as='a'>{message.author}</Comment.Author>);
      var commentMetaData = mergeWithPrev ? '' : (<Comment.Metadata>
                                                <div>{message.createdAt}</div>
                                               </Comment.Metadata>);
      var commentContext = <Comment.Content style={contentStyle} size='large'>
                            {commentAuthor}
                            {commentMetaData}
                            <br/>
                             <div style={textDivStle}>
                               <Comment.Text style={this.getTextStyle()}>{message.message}</Comment.Text>
                             </div>
                           </Comment.Content>;
      var msgFrmCurrUsr = this.props.isMessageFromCurrentUser(message.author);
      return(
        <Comment style={this.getCommentStyle(mergeWithPrev, msgFrmCurrUsr)}>
          {this.getAvatar(mergeWithPrev, msgFrmCurrUsr)}
          {commentContext}
        </Comment>
      )
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  isMessageFromCurrentUser: PropTypes.func.isRequired,
  isMessageFromUserOfPrevMessage : PropTypes.bool.isRequired,
}

var messageSegmentStyle = {
    display: 'inline-block',
    backgroundColor: 'dodgerblue',
    borderRadius: '1rem',
    maxWidth: '500px',
    padding: '8px',
}

var commentStyleBase = {
  paddingTop: '10px',
  marginBottom: '10px'
}

var textDivStle = {
  width: '80%',
  display: 'inline-block',
}
var textStyleRight = {
  fontSize: '15px',
  textAlign: 'justify',
  textAlignLast: 'right',
}

var textStyleLeft = {
  fontSize: '15px',
  textAlign: 'justify',
}

var currUserAvatarStyle = {
  float: 'right',
  marginLeft: '15px',
}

var contentStyle = {
  marginRight: '3.5em',
  marginLeft: '3.5em',
}
export default Message
