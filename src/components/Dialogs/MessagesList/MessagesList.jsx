import React from 'react';
import styles from './MessagesList.module.css'

const MessagesList = (props) => {
  return (
    <div className={styles.messagesList}>
      {props.messageList}
    </div>
  )
}

export default MessagesList;

