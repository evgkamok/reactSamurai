import React from 'react';
import Navbar from './Navbar/Navbar';
import styles from './Sidebar.module.css';
import FriendListContainer from "./FreindsList/FreindListContainer";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Navbar/>
      <span className={styles.titleFriendList}>Friends</span>
      <FriendListContainer />
    </div>
  )
}

export default Sidebar
