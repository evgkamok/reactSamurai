import React from 'react';
import styles from './MessagesList.module.css';
import {connect} from "react-redux";
import MessagesList from './MessagesList'

const mapStateToProps = (state) => {
 const messageList = state.dialogsPage.messagesData.map(message => {
   return (
     <div className={styles.message} key={message.id}>
      {message.message}
     </div>
   )
 })
 return {
    messageList: messageList
 }
}

const MessagesListContainer = connect(mapStateToProps)(MessagesList);

export default MessagesListContainer;