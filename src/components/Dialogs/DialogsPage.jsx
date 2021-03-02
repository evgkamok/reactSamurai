import React from 'react';
import styles from './DialogsPage.module.css';
import NamesListContainer from './NamesList/NamesListContainer'
import MessagesListContainer from './MessagesList/MessagesListContainer'
import SendMessageContainer from './SendMessage/SendMessageContainer';

const DialogsPage = () => {
  return (
    <div className={styles.dialogs}>
      <NamesListContainer/>
      <MessagesListContainer/>
      <SendMessageContainer/>
    </div>
  )
}

export default DialogsPage;


