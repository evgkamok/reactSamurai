import React from 'react';
import {connect} from "react-redux";
import FriendList from "./FreindList";

const FriendListContainer = (props) => {
  return <FriendList friends={props.friends}/>
}

const mapStateToProps = (state) => {
  return {
    friends: state.sidebar.friendsList
  }
}

export default connect(mapStateToProps)(FriendListContainer);