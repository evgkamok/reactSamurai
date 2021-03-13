import React from 'react';
import styles from './UsersPage.module.css';
import User from "./User";

const UsersPageList = (props) => {
  return (
    <div className={styles.usersWrapper}>
      {
        props.users.map(user => {
          return <User className={styles.user}
                       userId={user.id}
                       userPhotoSmall={user.photos.small}
                       userName={user.name}
                       userFollowed={user.followed}
                       userStatus={user.status}
                       disableFollowButtonArray={props.disableFollowButtonArray}
                       follow={props.follow}
                       unFollow={props.unFollow}
          />
          })
      }
    </div>
  )
}

export default UsersPageList;
