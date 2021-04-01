import React from 'react';
import styles from './FreindList.module.css';

const FriendList = ({friends}) => {
  return (
    <div className={styles.friendList}>
      {friends.map((friend) => {
        return (
          <div className={styles.friend} key={friend.id}>
            <img src={friend.avatarUrl} alt={friend.name}/>
            {friend.name}
          </div>
        )
      })
      }
    </div>
  )
}

export default FriendList;